require('dotenv').config();
const fs = require('fs');
const util = require('util');
const S3 = require('aws-sdk/clients/s3');
const unlinkFile = util.promisify(fs.unlink);
const sharp = require('sharp');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function getRandomInt() {
  return Math.floor(Math.random() * 99999);
}

// uploads a file to S3
function uploadFile(file) {
  const fileStream = fs.createReadStream(`uploads/${file.originalname}`);
  const imgId = getRandomInt();

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: imgId + file.originalname,
  };

  return s3.upload(uploadParams).promise();
}

exports.store = async (req, res) => {
  const file = req.file;
  console.log(file);
  fs.access('./uploads', (err) => {
    if (err) {
      fs.mkdirSync('./uploads');
    }
  });

  try {
    await sharp(req.file.buffer)
      .resize(1280, 960, { fit: 'contain' })
      .webp({ quality: 100 })
      .toFile('./uploads/' + file.originalname);
  } catch (error) {
    console.log('Error while processing image', error);
  }
  try {
    const result = await uploadFile(file);
    console.log(result);
    await unlinkFile('./uploads/' + file.originalname);
    res.status(201).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
};
