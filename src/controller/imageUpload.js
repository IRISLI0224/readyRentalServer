const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile } = require('./../config/s3');

exports.store = async (req, res) => {
  const file = req.file;
  // place to apply filter to image
  try {
    const result = await uploadFile(file);
    console.log(result);
    await unlinkFile(file.path);
    res.status(201).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
};
