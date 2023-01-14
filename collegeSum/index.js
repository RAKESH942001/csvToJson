const csvToJson = require("csvtojson");
const getStudentDetails=(studentDetails,feesData,fineDetails)=>
studentDetails.map(details=>{
  const studentCourse = feesData.find(fees=>fees.courses === details.courses).fees;
  const paidMonth = fineDetails.find(detail=>detail.paidMonth === details.paidMonth).penaltyAmt;
  return{...details,fees:studentCourse,fineAmt : paidMonth};

})

const main=async()=>{
  const studentDetails =await csvToJson().fromFile("./studentDetails.csv");
  const feesData = await csvToJson().fromFile('./fees.csv');
  const fineDetails = await csvToJson().fromFile('./fineDetails.csv');
   const studentFessDetails = getStudentDetails(studentDetails,feesData,fineDetails);
   console.table(studentFessDetails);
   
}
main();
