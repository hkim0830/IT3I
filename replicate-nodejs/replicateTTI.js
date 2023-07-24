import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

module.exports = async function (prompt){
const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = { prompt: "Wolf with dark blue nightsky in background, detailed, hd " };
const output = await replicate.run(model, { input });
console.log("replicate module has finished running, and is sending: " + output + "\n");
return output;
};