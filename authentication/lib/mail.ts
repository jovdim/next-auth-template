import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = "yourdomain@resend.dev";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register/email-verification?token=${token}`;

  await resend.emails.send({
    from: domain,
    to: email,
    subject: "Welcome! Please Confirm Your Email",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1F2937; background-color: #F9FAFB; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">

        <!-- Logo and Header -->
        <div style="text-align: center; padding: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="Company Logo" style="width: 100px; margin-bottom: 10px;" />
          <h1 style="font-size: 24px; color: #1D4ED8; font-weight: bold; margin: 0;">
            Welcome to [Your Company]!
          </h1>
          <p style="font-size: 16px; color: #4B5563; margin-top: 5px;">
            Let’s get you started.
          </p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #FFFFFF; padding: 24px; border-radius: 8px;">
          <p style="font-size: 16px; color: #111827; margin: 0 0 16px;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
            Thank you for joining us! To start exploring all that [Your Company] has to offer, please confirm your email address by clicking the button below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="display: inline-block; background-color: #1D4ED8; color: #FFFFFF; font-weight: bold; padding: 14px 28px; font-size: 16px; border-radius: 8px; text-decoration: none; transition: background-color 0.3s ease;">
              Confirm Your Email
            </a>
          </div>
          <p style="font-size: 14px; color: #9CA3AF; text-align: center;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>

        <!-- Benefits Section -->
        <div style="padding: 20px; background-color: #EFF6FF; border-radius: 8px; margin-top: 20px;">
          <p style="font-size: 14px; color: #1E40AF; line-height: 1.6; font-weight: bold; margin: 0;">
            What’s next?
          </p>
          <p style="font-size: 14px; color: #1E3A8A; line-height: 1.6; margin: 8px 0 0;">
            Once your email is confirmed, you can fully access your account and enjoy all of our features. Discover personalized recommendations, exclusive content, and more.
          </p>
        </div>

        <!-- Footer with Links -->
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; margin-top: 20px;">
          <p style="margin: 0;">Need help? Visit our 
            <a href="https://yourdomain.com/help" style="color: #1D4ED8; text-decoration: underline;">Help Center</a> or contact us at 
            <a href="mailto:support@yourdomain.com" style="color: #1D4ED8; text-decoration: underline;">support@yourdomain.com</a>.
          </p>
          <p style="margin: 12px 0;">
            Connect with us on 
            <a href="https://twitter.com/yourcompany" style="color: #1D4ED8; text-decoration: underline;">Twitter</a> | 
            <a href="https://linkedin.com/company/yourcompany" style="color: #1D4ED8; text-decoration: underline;">LinkedIn</a> | 
            <a href="https://facebook.com/yourcompany" style="color: #1D4ED8; text-decoration: underline;">Facebook</a>
          </p>
          <p style="color: #9CA3AF; margin-top: 16px;">&copy; 2023 [Your Company]. All rights reserved.</p>
        </div>

      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset/new-password?token=${token}`;

  await resend.emails.send({
    from: domain,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1F2937; background-color: #F9FAFB; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        
        <!-- Logo and Header -->
        <div style="text-align: center; padding: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="Company Logo" style="width: 100px; margin-bottom: 10px;" />
          <h1 style="font-size: 24px; color: #1D4ED8; font-weight: bold; margin: 0;">
            Reset Your Password
          </h1>
          <p style="font-size: 16px; color: #4B5563; margin-top: 5px;">
            We’ve received a request to reset your password.
          </p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #FFFFFF; padding: 24px; border-radius: 8px;">
          <p style="font-size: 16px; color: #111827; margin: 0 0 16px;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
            To reset your password, simply click the button below. This link will be active for the next 30 minutes. If you did not request a password reset, please ignore this email.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; background-color: #1D4ED8; color: #FFFFFF; font-weight: bold; padding: 14px 28px; font-size: 16px; border-radius: 8px; text-decoration: none; transition: background-color 0.3s ease;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #9CA3AF; text-align: center;">
            For your security, this link will expire in 30 minutes.
          </p>
        </div>

        <!-- Additional Info -->
        <div style="padding: 20px; background-color: #EFF6FF; border-radius: 8px; margin-top: 20px;">
          <p style="font-size: 14px; color: #1E40AF; line-height: 1.6; font-weight: bold; margin: 0;">
            Need help?
          </p>
          <p style="font-size: 14px; color: #1E3A8A; line-height: 1.6; margin: 8px 0 0;">
            If you encounter any issues or didn’t request this password reset, feel free to reach out to our support team.
          </p>
        </div>

        <!-- Footer with Links -->
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; margin-top: 20px;">
          <p style="margin: 0;">Need further assistance? Visit our 
            <a href="https://yourdomain.com/help" style="color: #1D4ED8; text-decoration: underline;">Help Center</a> or contact us at 
            <a href="mailto:support@yourdomain.com" style="color: #1D4ED8; text-decoration: underline;">support@yourdomain.com</a>.
          </p>
          <p style="margin: 12px 0;">
            Connect with us on 
            <a href="https://twitter.com/yourcompany" style="color: #1D4ED8; text-decoration: underline;">Twitter</a> | 
            <a href="https://linkedin.com/company/yourcompany" style="color: #1D4ED8; text-decoration: underline;">LinkedIn</a> | 
            <a href="https://facebook.com/yourcompany" style="color: #1D4ED8; text-decoration: underline;">Facebook</a>
          </p>
          <p style="color: #9CA3AF; margin-top: 16px;">&copy; 2023 [Your Company]. All rights reserved.</p>
        </div>

      </div>
    `,
  });
};
