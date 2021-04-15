interface AppEnv {
    SERVER_PORT: number;
}

const AppEnvs: AppEnv = {
    SERVER_PORT: Number(process.env.PORT || '3000'),
};

export { AppEnvs };
