import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}?retryWrites=true&w=majority`;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
