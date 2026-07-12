const { Jimp } = require("jimp");

async function cropLogo() {
  try {
    console.log("Reading logo1.png...");
    const image = await Jimp.read("public/logo1.png");

    // Autocrop removes empty (white/transparent) borders
    image.autocrop();
    
    // Save the cropped image
    await image.write("public/logo-cropped.png");
    console.log("Successfully created public/logo-cropped.png!");
  } catch (err) {
    console.error("Error generating cropped logo:", err);
  }
}

cropLogo();
