import mongoose, { ConnectOptions } from 'mongoose';

const URI = process.env.MONGODB_URL;

mongoose.set('strictQuery', false);

mongoose.connect(
    `${URI}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions,
    (err) => {
        if (err) {
            throw err;
        }
        console.log('Connect successfully to Mongodb');
    }
);
