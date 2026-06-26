const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

// Now the user should be able to upload image in the form of file. => this can be done with the help of multer as multer can read the form-data.
// To store the uploaded image we'll use the memory storage as we'll be storing the image in imagekit.io

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  console.log(req.body, req.file);

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
  });

  res.send(file);
};

module.exports = {
  createPostController,
};
