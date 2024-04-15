import asyncHandler from "express-async-handler";
import Admin from "../model/register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../emailer/sendMailer.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const adminRegister = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    role,
    company_name,
    phone_number,
    no_of_employees,
    industry,
  } = req.body;

  if (
    !email ||
    !password ||
    !company_name ||
    !phone_number ||
    !first_name ||
    !last_name
  ) {
    res.status(400);
    throw new Error("Required fields are missing.");
  }

  const user = await Admin.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  const adminRegister = await Admin.create({
    email,
    password: hashedPassword,
    role,
    first_name,
    last_name,
    company_name,
    phone_number,
    no_of_employees,
    industry,
    verificationToken,
  });

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/admin/verify-email/${verificationToken}`;

  const details = {
    to: email,
    subject: "Verify email address",
    html: `
    <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
              <div class="u-row">

                <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <div style="width: 100%;padding:0px;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">

                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                  <img alt="Image" src="https://res.cloudinary.com/dgsx4c862/image/upload/v1713176176/risLogo_opggf2.svg" width="154" height="60" layout="intrinsic" style="width: 100%;max-width: 154px;">

                                  </img>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
              <div class="u-row">

                <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <div style="width: 100%;padding:0px;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 140%;"><strong>THANKS&nbsp; &nbsp;FOR&nbsp; &nbsp;SIGNING&nbsp; &nbsp;UP!</strong></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                </span>
                              </p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
              <div class="u-row">

                <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <div style="width: 100%;padding:0px;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, ${first_name}</span></p>
                              <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You're almost ready to get started. Please click on the button below to verify your email address and enjoy exclusive cleaning services with us! </span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <!--[if mso]><style>.v-button {background: transparent;}</style><![endif]-->
                            <div align="center">
                              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:46px; v-text-anchor:middle; width:235px;" arcsize="8.5%"  stroke="f" fillcolor="#0f2e66"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                              <a href="${verificationUrl}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #0f2e66; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; font-size: 14px;">
                                <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                </span>
                                </span>
                              </a>
                              <!--[if mso]></center></v:roundrect><![endif]-->
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                              <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                              <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">RIS Team</span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style="padding: 0px;">
            <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
              <div class="u-row">

                <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <div style="width: 100%;padding:0px;">

                    <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                            <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © RIS All Rights Reserved</span></p>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>

          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>
    `,
  };

  const verificationEmail = await sendEmail(details);
  console.log(email, verificationEmail);

  if (adminRegister) {
    res.status(201).json({
      data: { id: adminRegister.id, email: adminRegister.email },
      message: "Admin created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    const verified = bcrypt.compare(password, admin.password);
    if (verified) {
      const token = jwt.sign(
        { email: admin.email, id: admin._id, admin: true },
        process.env.TOKEN_ACCESS,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        data: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
        },
        token,
        message: "Admin granted access.",
      });
    } else {
      res.status(403);
      throw new Error("Email or password is not valid.");
    }
  } else {
    res.status(404);
    throw new Error("Admin account not found.");
  }
});

const adminVerify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400);
    throw new Error("Token is missing.");
  }

  const verifiedAdmin = await Admin.findOne({ verificationToken: token });

  if (verifiedAdmin) {
    verifiedAdmin.verified = true;
    verifiedAdmin.verificationToken = undefined;
    await verifiedAdmin.save();
    res.status(200).json({
      data: { id: verifiedAdmin.id, verified: verifiedAdmin.verified },
      message: "Admin verified successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Admin not found or verification token is invalid.");
  }
});

// if (req?.user?.admin) {
// } else {
//   res.status(403);
//   throw new Error("Admin access required.");
// }
export { adminRegister, adminLogin, adminVerify };
