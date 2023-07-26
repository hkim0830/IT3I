/*const Replicate = require('replicate');
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
*/

module.exports = async function (imageBase64){
  console.log("Replicate module has received image");
  const model = "pharmapsychotic/clip-interrogator:a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90";
  const input = { image: imageBase64, mode : 'fast' };
  
  try {
    const output = await rep.run(model, { input });
    console.log("Replicate module has finished running, and is sending: " + output + "\n");
    return output;
  } catch (error) {
    console.error("Error occurred in Replicate:", error);
    throw error;  // Or handle the error in a way that makes sense for your application
  }
};
