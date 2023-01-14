import printOutput from "./printOutput.mjs";
import processInput from "./processData.mjs";
import readInput from "./readInput.mjs"

const app=async()=>{
  const input = await readInput();
  const output = processInput(input);
  printOutput(output);

}
app();