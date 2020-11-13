require('dotenv').config({path: '.env'})
const imageUpload = async (base64, attrs) => {
  if (!base64) return null ;
  
  const AWS = require('aws-sdk');

  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env;

  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(base64.split(";base64,")[1], 'base64');

  const type = base64.split(';')[0].split(":")[1];

  const params = {
    Bucket: S3_BUCKET,
    Key: attrs.name, // type is not required
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: type // required. Notice the back ticks
  }
  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
     console.log(error)
  }
  return location;
}

module.exports = imageUpload;