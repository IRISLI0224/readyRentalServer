const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile } = require('./../config/s3');

exports.store = async (req, res) => {
  const file = req.file;
  console.log(file);

  // some place to apply filter to image

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  res.send({ imageInfo: `/images/${result}` });
};
