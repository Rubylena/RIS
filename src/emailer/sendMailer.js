import createTransporter from "./transporter.js";
import dotenv from "dotenv";
dotenv.config();

async function sendEmail(details) {
  try {
    const transporter = createTransporter();

    // Send mail with defined transport object
    const info = {
      from: `"RIS" <${process.env.HOTMAIL_EMAIL}>`, // sender address
      to: details.to, // recipient address
      subject: details.subject,
      text: details.text,
      html: details.html,
    };
    transporter.sendMail(info);
    return `Email notification sent to ${details.to}`;
  } catch (error) {
    return `Error sending email notification: ${error}`;
  }
}

export default sendEmail;
