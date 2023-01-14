import csvToJson from 'csvtojson';

const readData=async ()=>{
  const shopBill = await csvToJson().fromFile("./shopBill.csv");
  const shopRevenueData=await csvToJson().fromFile("./shopRevenue.csv");
  const profitLevel=await csvToJson().fromFile("./profitLevel.csv");
  return{shopBill,shopRevenueData,profitLevel};
};
export default readData;