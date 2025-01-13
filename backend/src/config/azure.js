const { AzureOpenAI } = require("openai");

const azure = new AzureOpenAI({
    endpoint: process.env.AZURE_ENDPOINT,
    apiKey: process.env.AZURE_API_KEY,
    apiVersion: process.env.AZURE_API_VERSION,
    deployment: process.env.DALLE_DEPLOYMENT_NAME,
  });

module.exports = azure;
