const Replicate = require('replicate');
const rep = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
module.exports = async function (userImage){
  console.log("replicate module has received image");
  const model = "pharmapsychotic/clip-interrogator:a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90";
  const input = {image: `${userImage}`, mode : 'fast'   };
  const output = await rep.run(model, { input });
  console.log("replicate module has finished running, and is sending: " + output + "\n");
  return output;
};