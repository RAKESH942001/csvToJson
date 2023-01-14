import readData from "./readData.mjs";
import processData from "./processData.mjs";
import printOutput from "./printOutput.mjs";

const app = async () => {
  const input = await readData();
  const output = processData(input);
  printOutput(output);
  
};

app();
