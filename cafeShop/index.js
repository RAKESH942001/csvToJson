const csvToJson = require("csvtojson");

const convertShopBill = (shopBill) =>
  shopBill.map((bill) => ({
    ...bill,
    year: Number(bill.year),
    electricBill: Number(bill.electricBill),
    gasBill: Number(bill.gasBill),
    employeeSalary: Number(bill.employeeSalary),
    ingredients: Number(bill.ingredients),
    waterBill: Number(bill.waterBill),
    shopRent: Number(bill.shopRent),
    wifiBill: Number(bill.wifiBill),
  }));
const convertShopRevenue = (productData) =>
  productData.map((data) => ({
    ...data,
    year: Number(data.year),
    coffeeRate: Number(data.coffeeRate),
    coffeeSold: Number(data.coffeeSold),
    teaRate: Number(data.teaRate),
    teaSold: Number(data.teaSold),
    cookieRate: Number(data.cookieRate),
    cookieSold: Number(data.cookieSold),
    cakeRate: Number(data.cakeRate),
    cakeSold: Number(data.cakeSold),
    juiceRate: Number(data.juiceRate),
    juiceSold: Number(data.juiceSold),
  }));
const getTotalBill = (shopBill) =>
  shopBill.map((bill) => ({
    ...bill,
    totalCost:
      bill.electricBill +
      bill.gasBill +
      bill.employeeSalary +
      bill.ingredients +
      bill.waterBill +
      bill.shopRent +
      bill.wifiBill,
  }));
const getTotalRevenue = (convertedShopRevenue) =>
  convertedShopRevenue.map((revenue) => ({
    ...revenue,
    totalRevenue:
      revenue.coffeeSold +
      revenue.teaSold +
      revenue.cookieSold +
      revenue.cakeSold +
      revenue.juiceSold,
  }));
  const addDetails = (totalBillCost, totalRevenue) =>
  totalBillCost.map((data) => {
    const findRevenue = totalRevenue.find(
      (details) => details.year === data.year
    ).totalRevenue;
    return {
      totalInvestment : data.totalCost,
      totalRevenue: findRevenue,
      profit: findRevenue - data.totalCost,
    };
  });

const findProfitLevel = (profitLevel, shopProfits) =>
  shopProfits.map((revenue) => {
    const findProfitLevel = profitLevel.find(
      (profitAmount) => revenue.profit >= profitAmount.amount
    ).profitData;
    return { ...revenue, profitLevel: findProfitLevel };
  });
  const printOutput=(output)=>{
    console(output.shopProfitLevel);
  }
  const processData=(input)=>{
  const convertedShopBill = convertShopBill(input.shopBill);
  const convertedShopRevenue = convertShopRevenue(input.shopRevenueData);
  const totalBillCost = getTotalBill(convertedShopBill);
  const totalRevenue = getTotalRevenue(convertedShopRevenue);
  const shopProfits = addDetails(totalBillCost, totalRevenue);
  const shopProfitLevel = findProfitLevel(input.profitLevel,shopProfits);
  return {shopProfitLevel,totalRevenue,totalBillCost};

  }
const readData=async ()=>{
  const shopBill = await csvToJson().fromFile("./shopBill.csv");
  const shopRevenueData=await csvToJson().fromFile("./shopRevenue.csv");
  const profitLevel=await csvToJson().fromFile("./profitLevel.csv");
  return{shopBill,shopRevenueData,profitLevel};
};
const main = async () => {
  const input = await readData();
  const output = processData(input);
  printOutput(output);
  
};

main();
