const csvToJson = require("csvtojson");
const convertFlightDetails = (flightDetails) =>
  flightDetails.map((details) => ({
    ...details,
    pricePerSeat: Number(details.pricePerSeat),
    totalNoOfSeats: Number(details.totalNoOfSeats),
    seatsBooked: Number(details.seatsBooked),
    seatsUnbooked: Number(details.totalNoOfSeats) - Number(details.seatsBooked),
  }));
const convertExpenses = (airlinesExpenses) =>
  airlinesExpenses.map((expense) => ({
    ...expense,
    fuel: Number(expense.fuel),
    otherExpenses: Number(expense.otherExpenses),
    otherRevenues: Number(expense.otherRevenues),
  }));
const getRevenueAndExpenses = (
  convertedFlightDetails,
  convertedAirlineExpenses
) =>
  convertedAirlineExpenses.map((airline) => {
    findFlightDetails = convertedFlightDetails.find(
      (details) => details.day == airline.day
    );
    const seatRevenue=findFlightDetails.seatsBooked * findFlightDetails.pricePerSeat;
    const lossOfUnbookedSeats= findFlightDetails.pricePerSeat * findFlightDetails.seatsUnbooked;
    return {
      ...airline,
      bookedSeatsRevenue: seatRevenue,
      lossOfUnbookedSeats:lossOfUnbookedSeats,
      totalExpenses:airline.fuel +airline.otherExpenses + lossOfUnbookedSeats,
      totalRevenue:airline.otherRevenues +seatRevenue,
        profit : 
        (airline.otherRevenues +seatRevenue) -(airline.fuel +airline.otherExpenses +lossOfUnbookedSeats),

    };
  });
   const secondToMilliSecond =1000;
  const getGroundTime=(convertedFlightDetails)=>
  convertedFlightDetails.map(details=>{
    const minutesToSec =60;
    const arrival = new Date(`${details.dateOfArrival}T${details.actualTimeOfArr}`);
    const departure =new Date(`${details.dateOfDep}T${details.actualTimeOfDep}`);
    const groundTime = (((departure - arrival)/secondToMilliSecond)/minutesToSec);
    const departureStatus = groundTime >80 ? "Delayed" :"OnTime";
    return{
      day : details.day,
      flightNo : details.flightNo,
      dateOfArrival : details.dateOfArrival,
      scheduledTimeOfArr : details.scheduledTimeOfArr,
      dateOfDep : details.dateOfDep,
      scheduledTimeOfDep :details.scheduledTimeOfDep,
      actualTimeOfArr :details.actualTimeOfArr,
      actualTimeOfDep :details.actualTimeOfDep,
      groundTime : groundTime,
      departureStatus :departureStatus,
    };
  });

  const getTotalProfit=(revenueAndExpenses)=> revenueAndExpenses.reduce((a,b)=> a+b.profit,0);
const main = async () => {
  const airlinesExpenses = await csvToJson().fromFile("./airlineExpenses.csv");
  const flightDetails = await csvToJson().fromFile(
    "./flightBookingDetails.csv"
  );
  const convertedFlightDetails = convertFlightDetails(flightDetails);
  const convertedAirlineExpenses = convertExpenses(airlinesExpenses);
  const revenueAndExpenses = getRevenueAndExpenses(
    convertedFlightDetails,
    convertedAirlineExpenses
  );
const totalProfit = getTotalProfit(revenueAndExpenses);
const groundTimeAndDepartureStatus = getGroundTime(convertedFlightDetails);
  console.table(convertedFlightDetails);
  console.table(revenueAndExpenses);
  console.log("Total Profit:",totalProfit);
  console.table(groundTimeAndDepartureStatus);
};
main();
