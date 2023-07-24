
const Replicate = require('replicate');
const rep = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
module.exports = async function (prompt){
  console.log("replicate module has received: " + prompt);
  const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
  const input = { prompt: `${prompt}` };
  const output = await rep.run(model, { input });
  console.log("replicate module has finished running, and is sending: " + output + "\n");
  return output;
};