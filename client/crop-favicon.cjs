const { Jimp } = require("jimp");

async function createFavicon() {
  try {
    console.log("Reading logo1.png...");
    const image = await Jimp.read("public/logo1.png");

    // The newer Jimp requires options objects for crop
    // Autocrop removes empty borders
    image.autocrop();

    const cropWidth = image.bitmap.width;
    const cropHeight = Math.floor(image.bitmap.height * 0.68);
    
    // Crop the top 68%
    image.crop({ x: 0, y: 0, w: cropWidth, h: cropHeight });
    
    // Autocrop again to remove sides
    image.autocrop();

    const size = Math.max(image.bitmap.width, image.bitmap.height);
    
    const square = new Jimp({ width: size, height: size, color: 0x00000000 });
    const x = (size - image.bitmap.width) / 2;
    const y = (size - image.bitmap.height) / 2;
    
    // Composite the image onto the square
    square.composite(image, x, y);

    // Resize
    square.resize({ w: 256, h: 256 });
    
    await square.write("public/favicon.png");
    console.log("Successfully created public/favicon.png!");
  } catch (err) {
    console.error("Error generating favicon:", err);
  }
}

createFavicon();
