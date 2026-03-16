const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const R2_ACCOUNT_ID = process.env.VITE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.VITE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.VITE_R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const BUCKET_NAME = process.env.VITE_R2_BUCKET_NAME;

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function listFiles() {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));
    const files = data.Contents.map(c => c.Key);
    console.log(JSON.stringify(files, null, 2));
  } catch (err) {
    console.error('Error', err);
  }
}

listFiles();
