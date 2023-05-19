import { MongoClient } from 'mongodb';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

let MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DBNAME}?retryWrites=true&w=majority`;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
