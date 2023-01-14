
const getCitizensDetails=(citizens,states,regions)=>
citizens.map(citizen=>{
   const citizenState = states.find(state=>state.location === citizen.location).state;
   const citizenRegion = regions.find(region=>region.state === citizenState).region;

  return{
    ...citizen,
    age :Number(citizen.age),
    state : citizenState,
    region :citizenRegion
  };
});

const getRegionalCompensations=(citizensDetails,citizensRegionalCompensations)=>
citizensDetails.map(citizen=>{
  const regionType = citizensRegionalCompensations.find(compensation=>compensation.regionType === citizen.region);
 
  return{
    ...citizen,
    baseCompensation : Number(regionType.baseCompensation),
  };
});

const getGenderCompensations=(citizensRegionalCompensations,genderCompensations)=>
citizensRegionalCompensations.map(citizen=>{
 const  genderType = Number(genderCompensations.find(compensation=>compensation.gender === citizen.gender).compPercentage);

  return{
    ...citizen,
    genderCompPercentage :genderType,
    genderCompensationAmount :genderType * citizen.baseCompensation,
   };
});

const getCompensation=(citizensGenderCompensations,ageCompensation,overWriteCompensation)=>
citizensGenderCompensations.map(citizen=>{
   const ageGroupData = ageCompensation.find(age=>age.minAge <= citizen.age).ageGroup;
   const ageCompensationsPercent = Number(ageCompensation.find(compensation=>compensation.ageGroup === ageGroupData).compensationPercentage);
   const ageCompensationsAmount = (ageCompensationsPercent *citizen.baseCompensation) * citizen.genderCompPercentage;
   const ageWise = overWriteCompensation.find(({value})=>value === citizen.ageGroupData ||
  value === citizen.gender)   
  ? (Math.max(citizen.genderCompensationAmount,ageCompensationsAmount))
  : citizen.genderCompensationAmount;

  return{...citizen,
    finalValue:ageWise,
    ageGroup : ageGroupData,
    ageCompensationPercentage :ageCompensationsPercent,
    ageCompensationAmount :ageCompensationsAmount
}
});

const getCitizenData=(ageCompensationData)=>
ageCompensationData.map(data=>{

 return{
  name : data.name,
  age : data.age,
  gender :data.gender,
  baseCompensation:data.baseCompensation,
  genderCompPercentage:data.genderCompPercentage,
  genderCompensationAmount:data.genderCompensationAmount,
  ageGroup:data.ageGroup,
  ageCompensationPercentage:data.ageCompensationPercentage,
  ageCompensationAmount:data.ageCompensationAmount,
  finalCompensationAmount:data.finalValue
 };

});
const processInput =(input)=>{
  
  const citizensDetails = getCitizensDetails(input.citizens,input.states,input.regions);
  const citizensRegionalCompensations =getRegionalCompensations(citizensDetails,input.regionalCompensations)
  const citizensGenderCompensations = getGenderCompensations(citizensRegionalCompensations,input.genderCompensations);
  const ageCompensationData = getCompensation(citizensGenderCompensations,input.ageCompensation,input.overWriteCompensation);
  const citizenCompenSationData = getCitizenData(ageCompensationData);
  
  return citizenCompenSationData; 
};

export default processInput;
