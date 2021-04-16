/* eslint-disable @typescript-eslint/no-explicit-any */
import * as uuid from 'uuid';
import * as fs from 'fs';

interface FileUploaderOption {
    dest: string;
}

interface FileDetails {
    fieldName: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    destination: string;
    path: string;
    size: number;
}

const _fileHandler = (file: any, options: FileUploaderOption) => {
    if (!file) throw new Error('no file');

    const fileName = uuid.v1();
    const path = `${options.dest}${fileName}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', () =>  {
            const fileDetails: FileDetails = {
                fieldName: file.hapi.name,
                originalName: file.hapi.filename,
                fileName,
                mimeType: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            }

            resolve(fileDetails);
        })
    })
}

const uploader = (file: any, options: FileUploaderOption) => {
    if (!file) throw new Error('no file(s)');

    return _fileHandler(file, options);
}

export { uploader, FileUploaderOption }