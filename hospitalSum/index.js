const csvToJson = require("csvtojson");
const getConvert = (hospitalWard) =>
  hospitalWard.map((ward) => ({
    ...ward,
    days: Number(ward.days),
  }));
const getConvertCharge = (hospitalCharges) =>
  hospitalCharges.map((charges) => ({
    ...charges,
    charges: Number(charges.charges),
    doctorFees: Number(charges.doctorFees),
  }));
const getCovertExpenditure = (hospitalExpenditure) =>
  hospitalExpenditure.map((expenses) => ({
    ...expenses,
    cost: Number(expenses.cost),
  }));
const addDoctorFee = (convertedHospitalCharges, convertedHospitalWard) =>
  convertedHospitalWard.map((ward) => {
    const findDoctorFees = convertedHospitalCharges.find(
      (wardType) => wardType.wardType === ward.wardType
    );
    return {
      ...ward,
      doctorFees: findDoctorFees.doctorFees* ward.days,
      totalCharges:
        findDoctorFees.charges * ward.days + findDoctorFees.doctorFees* ward.days
    };
  });

const getCovertBill = (billInMonth) =>
  billInMonth.map((bill) => ({
    ...bill,
    dischargePatientNo: Number(bill.dischargePatientNo),
    dateOfJoining: new Date(bill.dateOfJoining).getDate(),
    dateOfDischarge: new Date(bill.dateOfDischarge).getDate(),
  }));
const getMonthBill = (convertedBillInMonth, totalWardCharges) =>
  convertedBillInMonth.map((bill) => {
    const totalBill=totalWardCharges.filter(month=>month.patientId == bill.dischargePatientNo)
    .reduce((a,b)=>a+b.totalCharges,0);
    return({
      ...bill,
      noOfDays: bill.dateOfDischarge - bill.dateOfJoining,
      totalAmount:totalBill
    });
  });


  
  const getHospitalExpenditure = (hospitalProfit, convertHospitalExpenditure,patientMonthBill) =>
  hospitalProfit.map((profit) => {
    const findExpensesMonth = (convertHospitalExpenditure.filter(
      (expenses) => expenses.month === profit.monthWise)).reduce((a,b)=>a+b.cost,0);
      const getHospitalIncome=(patientMonthBill.filter(
        income=>income.dischargeMonth === profit.monthWise)).reduce((a,b)=>a+b.totalAmount,0);
        
        return { ...profit, expenditure: findExpensesMonth,revenue : getHospitalIncome,profit :getHospitalIncome - findExpensesMonth};
  });

  const getProfitLevel =(profitLevel,expensesOfHospital)=>
  expensesOfHospital.map(hospital=>{
    const findProfitLevel= profitLevel.find(level=>level.amount<= hospital.profit).status;
   return({...hospital,profitLevel : findProfitLevel});
  }); 

 
const main = async () => {
  const hospitalWard = await csvToJson().fromFile("./hospitalWard.csv");
  const hospitalCharges = await csvToJson().fromFile("./hospitalCharges.csv");
  const billInMonth = await csvToJson().fromFile("./billInMonth.csv");
  const hospitalExpenditure = await csvToJson().fromFile(
    "./hospitalExpenditure.csv"
  );
  const hospitalProfit = await csvToJson().fromFile("./hospitalProfit.csv");
  const profitLevel =await csvToJson().fromFile("./profitLevel.csv");
  const convertedHospitalWard = getConvert(hospitalWard);
  const convertedHospitalCharges = getConvertCharge(hospitalCharges);
  const convertedBillInMonth = getCovertBill(billInMonth);
  const convertHospitalExpenditure = getCovertExpenditure(hospitalExpenditure);
  const totalWardCharges = addDoctorFee(
    convertedHospitalCharges,
    convertedHospitalWard
  );
  const patientMonthBill = getMonthBill(convertedBillInMonth, totalWardCharges);
  const expensesOfHospital = getHospitalExpenditure(
    hospitalProfit,
    convertHospitalExpenditure,
    patientMonthBill,
    
  );
  const hospitalProfitLevel =getProfitLevel(profitLevel,expensesOfHospital);
  console.table(totalWardCharges);
   console.table(patientMonthBill);
   console.table(expensesOfHospital);
  console.table(convertHospitalExpenditure);
  console.table(hospitalProfitLevel);

  

};
main();
