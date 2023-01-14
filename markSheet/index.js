const csvToJson = require('csvtojson');
const stringToNumber =(markSheets)=>markSheets.map((marks)=>({
  ...marks,
  tamil : Number(marks.tamil),
  english : Number(marks.english),
  maths : Number(marks.maths),
  science :Number(marks.science),
  social :Number(marks.social),

}))
const getTotal=(examPapers)=>{
  return(
  examPapers.tamil +
  examPapers.english +
  examPapers.maths +
  examPapers.science +
  examPapers.social
  );
};
let passMark = 35;
const getResult =(examPapers)=>{
  return Math.min(
    examPapers.tamil,
    examPapers.english,
    examPapers.maths,
    examPapers.science,
    examPapers.social,
  )>= passMark?
  "Pass" :"Fail";
};
const processData=(paper)=>paper.map(papers=>({
  ...papers,
  total :getTotal(papers),
  result :getResult(papers),

}));

const main = async() => {
  const studentsData = await csvToJson().fromFile('./data.csv');
  const studentDetails =stringToNumber(studentsData);
  const processedData= processData(studentDetails);
  console.log(processedData);
  // console.log(studentDetails);
}
main();


