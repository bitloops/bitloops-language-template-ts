import { MongoClient } from 'mongodb';

// Connection URL
const baseUrl = 'mongodb://localhost:27017';

const { MONGO_URL_PREFIX, MONGO_URL_SUFFIX, MONGO_USER, MONGO_PASSWORD } = process.env;

let url: string;
if (MONGO_URL_PREFIX && MONGO_URL_SUFFIX) {
  url = `${MONGO_URL_PREFIX}${MONGO_URL_SUFFIX}`;
  if (MONGO_USER && MONGO_PASSWORD)
    url = `${MONGO_URL_PREFIX}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_URL_SUFFIX}`;
} else url = baseUrl;

const client = new MongoClient(url);
export { client };
