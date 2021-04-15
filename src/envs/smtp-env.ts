interface SmtpEnv {
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_AUTH_USER: string;
    SMTP_AUTH_PASSWORD: string;
}

const SmtpEnvs: SmtpEnv = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_AUTH_USER: process.env.SMTP_AUTH_USER,
    SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD,
};

export { SmtpEnvs };
