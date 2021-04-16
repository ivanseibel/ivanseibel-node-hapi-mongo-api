'use strict';

import { ServerRoute } from '@hapi/hapi';
// import { submitStockFileController } from '../useCases/SubmitStockFile';
import { FileServerEnvs } from '../../envs';
import { excelToJSON } from '../utils/excel';
import { uploader } from '../utils/uploader';
import * as path from 'path';

const stockFile:ServerRoute[]  = [
    {
        method: 'POST',
        path: '/v1/stock-file',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true, // This attribute is necessary to avoid receive binary files like .xlsx
            }
        },
        handler: async function (request, reply) {
            try {
                const data = request.payload;
                const file = data['file'];

                if (!file) {
                    throw new Error('You must provide a file');
                }
    
                const destination = path.join(process.cwd(), FileServerEnvs.UPLOAD_PATH);

                const fileDetails = await uploader(file, { dest: destination });
                return reply.response( { fileDetails } ).code(200);
    
            } catch (err) {
                return reply.response({message: 'oh-oh, something goes wrong: ' + err.message}).code(422);
            }
        }
    },

    {
        method: 'GET',
        path: '/v1/stock-file',
        handler: async function (request, reply) {
            try {
                const fileName = request.query['fileName'];

                if (!fileName) {
                    throw new Error('You must provide a file');
                }
    
                const filePath = path.join(process.cwd(), FileServerEnvs.UPLOAD_PATH, fileName);

                const processedFile = await excelToJSON(filePath);
                return reply.response( { processedFile} ).code(200);
    
            } catch (err) {
                return reply.response({message: 'oh-oh, something goes wrong: ' + err.message}).code(422);
            }
        }
    },
];

export { stockFile };
