import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger, Logger } from 'nestjs-pino';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
export interface EmailOption {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(
    private configService: ConfigService,
    @InjectPinoLogger(EmailService.name) private readonly Logger: PinoLogger,
  ) {
    this.createTransporter();
  }

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });

    void this.verifyConnection();
  }

  private async verifyConnection() {
    try {
        await this.transporter.verify();
        this.Logger.info({msg: 'email.smtp.connected'})
    } catch (error) {
        this.Logger.error({msg: 'email.smtp.connectionFailed'})
    }
  }

  async sendEmail(options: EmailOption): Promise<boolean> {
    try {
        const mailOptions = {
            from: options.from || this.configService.get<string>('SMTP_FROM'),
            to: Array.isArray(options.to) ? options.to.join(',') : options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        } 

        const info = await this.transporter.sendMail(mailOptions);
        this.Logger.info({
            msg: 'email.sent',
            messageId: info.messageId,
            subject: options.subject
        })

        return true;
        } catch (error) {
            this.Logger.error({
                msg: 'email.sendFailed',
                subject: options.subject,
                error: (error as Error).message
            });

            return false;
    }
  }
}
