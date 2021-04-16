interface FileServerEnv {
    UPLOAD_PATH: string;
}

const FileServerEnvs: FileServerEnv = {
    UPLOAD_PATH: process.env.UPLOAD_PATH,
};

export { FileServerEnvs };
