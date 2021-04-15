import { IMailAdapter, IMessage } from '../IMailAdapter';
import { createTransport } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import { SmtpEnvs } from '../../../envs';

export class MailTrapMailAdapter implements IMailAdapter {
    private transporter: Mail;

    constructor(){
        this.transporter = createTransport({
            host: SmtpEnvs.SMTP_HOST,
            port: SmtpEnvs.SMTP_PORT,
            auth: {
              user: SmtpEnvs.SMTP_AUTH_USER,
              pass: SmtpEnvs.SMTP_AUTH_PASSWORD,
            }
          });
    }

    async sendMail(message: IMessage): Promise<void>{
        await this.transporter.sendMail({
            from: {
                address: message.from.email,
                name: message.from.name
            },
            to: {
                address: message.to.email,
                name: message.to.name,
            },
            subject: message.subject,
            html: message.body,
        })
    }
    
}