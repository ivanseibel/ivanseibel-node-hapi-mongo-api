/* eslint-disable no-console */
import { AppServer } from './server';
import * as Mongoose from 'mongoose';
import { DataBaseEnv } from './envs';

const startServer = async () => {
    console.info('Initializing Application Server');
    await AppServer.init();
};

const connectDataBse = async () => {
    console.info('Connecting to Database!');
    await Mongoose.connect(DataBaseEnv.URI, {
        dbName: DataBaseEnv.DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.info('Database Connected!');
};

const startApplication = async () => {
    await connectDataBse();
    await startServer();
};

startApplication();
