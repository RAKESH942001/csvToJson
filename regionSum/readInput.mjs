import csvToJson from "csvtojson";

const readInput=async()=>{
  
    const citizens =await csvToJson().fromFile("./citizen.csv");
    const states =  await csvToJson().fromFile('./state.csv');
    const regions = await csvToJson().fromFile('./regions.csv');
    const ageCompensation = await csvToJson().fromFile('./ageCompensation.csv');
    const regionalCompensations =await csvToJson().fromFile('./regionalCompensation.csv');
    const genderCompensations = await csvToJson().fromFile('./genderCompensation.csv');
    const overWriteCompensation = await csvToJson().fromFile('./overwriteCompensation.csv');
    return{citizens,states,regions,ageCompensation,regionalCompensations,genderCompensations,overWriteCompensation};
  
};
export default readInput;