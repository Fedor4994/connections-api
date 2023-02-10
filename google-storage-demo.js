const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "connections-api";
const filePath = "./tmp/1675947107879.jpeg";
const destFileName = "1675947107879.jpeg ";

async function launchDemo() {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
}

launchDemo().catch(console.error);
