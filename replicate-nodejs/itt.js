import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "pharmapsychotic/clip-interrogator:a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
  {
    input: {
      image: "https://replicate.delivery/pbxt/0XPrTCaNWhqKF5nVZS0H9UNlXMEM29JXuwiFErpJ5vHjTdUE/out-0.png"
    }
  }
);

console.log(output);