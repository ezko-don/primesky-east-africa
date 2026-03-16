import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Manual env parsing since dotenv isn't in package.json
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const R2_ACCOUNT_ID = env.VITE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = env.VITE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = env.VITE_R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = env.VITE_R2_BUCKET_NAME;
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

console.log('Testing with:');
console.log('Account ID:', R2_ACCOUNT_ID);
console.log('Bucket:', BUCKET_NAME);
console.log('Endpoint:', R2_ENDPOINT);

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
    if (!data.Contents) {
      console.log('No files found in bucket.');
      return;
    }
    const files = data.Contents.map(c => c.Key);
    console.log('FILES_START');
    console.log(JSON.stringify(files, null, 2));
    console.log('FILES_END');
  } catch (err) {
    console.error('Error connecting to R2:', err.message);
  }
}

listFiles();
