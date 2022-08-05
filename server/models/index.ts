import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';

mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

const db = mongoose.connection;

db.once('open', () => console.log('db connected'));

module.exports = mongoose;
