require('dotenv').config();
const fs = require('fs');
const util = require('util');
const S3 = require('aws-sdk/clients/s3');
const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to S3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

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
