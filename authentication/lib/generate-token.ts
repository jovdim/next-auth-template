import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./data/verification-token";
import db from "./db";
import { getPasswordResetTokenByEmail } from "./data/password-reset-token";

// email token
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  //delete token if there is any
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });
  return verificationToken;
};

//password token
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes

  const existingToken = await getPasswordResetTokenByEmail(email);

  //delete token if there is any
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });
  return passwordResetToken;
};
