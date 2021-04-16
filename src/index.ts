/* eslint-disable no-console */
import { AppServer } from './server';
import * as Mongoose from 'mongoose';
import { DataBaseEnv } from './envs';
import * as fs from 'fs';
import { FileServerEnvs } from './envs';
import * as path from 'path';

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

const createUploadsFolder = async () => {
    console.info('Creating Uploads Folder!');
    if (!fs.existsSync(path.join(process.cwd(), FileServerEnvs.UPLOAD_PATH))){
        fs.mkdirSync(path.join(process.cwd(), FileServerEnvs.UPLOAD_PATH));
        console.info('Folder Created!');
    } 
    console.info('Folder Already Exists!');
};

const startApplication = async () => {
    await createUploadsFolder();
    await connectDataBse();
    await startServer();
};

startApplication();
