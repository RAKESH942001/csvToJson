const csvToJson = require("csvtojson");
const convertRecords=(cricketRecords)=>
cricketRecords.map(record=>({
  ...record,
  date:new Date(record.date),
}));
const convertMatch=(matchType)=>
matchType.map(type=>({
  ...type,
  date : new Date(type.date),
}));
const getTeamDetails=(cricketRecords,coachDetails)=>
cricketRecords.map(record=>{
  const findWinningCoach = coachDetails.find(coachDetail=>coachDetail.team === record.winningTeam).coach;
  return{...record,winningTeamCoach :findWinningCoach};

});
const getMatchType=(winningTeamCoach,convertedMatchType)=>
winningTeamCoach.map(team=>{
  const findMatchType=convertedMatchType.find(match=>match.date <= team.date);
  return{...team,matchType :findMatchType.matchType};
});

const main = async () => {
  const cricketRecords= await csvToJson().fromFile("./cricketRecords.csv");
  const coachDetails= await csvToJson().fromFile("./coach.csv");
  const matchType= await csvToJson().fromFile("./matchType.csv");
  const convertedCricketRecord = convertRecords(cricketRecords);
  const convertedMatchType = convertMatch(matchType);
  const winningTeamCoach = getTeamDetails(convertedCricketRecord,coachDetails);
  const teamMatchType = getMatchType(winningTeamCoach,convertedMatchType);
  console.table(convertedCricketRecord);
  console.table(convertedMatchType);
  console.table(winningTeamCoach);
  console.table(teamMatchType);
  
  
};
main();