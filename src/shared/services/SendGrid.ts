import client from "@sendgrid/mail";

import environment from "../../config/environment";

class EmailService {
  private client: any;

  constructor() {
    this.client = client.setApiKey(environment.sendgridApiKey);
  }

  async sendOTP(recipient: Array<string>, otp: string, passReset = false) {
    let subject = "Verify Your Account";
    let content = `<p>Hi there, <br/>Kindly verify your account with this code: ${otp}</p>`;
    if (passReset) {
      subject = "Reset Your Password";
      content = `<p>Hi there, <br/>Kindly reset your password with this code: ${otp} by clicking this url : localhost:8080/</p>`;
    }
    await this.sendEmail(recipient, subject, content);
  }

  async sendEmail(recipient: Array<string>, subject: string, content: string) {
    const msg = {
      to: recipient,
      from: environment.defaultMailSender,
      subject: subject,
      html: content,
      footer: false,
    };

    try {
      await this.client.send(msg);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}

export default EmailService;
