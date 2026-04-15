import { userTable } from "../../db/schema";
import db from "../../db/index";
import { eq } from "drizzle-orm";
import { ApiError } from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefreshToken,
  gerateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

async function register({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName?: string | undefined;
  email: string;
  password: string;
}) {
  const userEmailResult = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (userEmailResult.length > 0) {
    throw ApiError.badRequest("Account already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rawToken, hashToken } = gerateResetToken();

  const [user] = await db
    .insert(userTable)
    .values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: hashToken,
    })
    .returning({ id: userTable.id });

  return user;
}
const login = async ({ email, password }: { email: string; password: string }) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!user) {
    throw ApiError.notFound("No account found with this email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw ApiError.forbidden("Incorrect password");
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id });

  const hashedRefreshToken = hashToken(refreshToken);

  await db
    .update(userTable)
    .set({ refreshToken: hashedRefreshToken })
    .where(eq(userTable.id, user.id));

  return { user, accessToken, refreshToken };
};


const issueAccessToken = async (token: string) => {
  if (!token) {
    throw ApiError.forbidden("Refresh token missing. Please login again");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired session. Please login again");
  }

  const hashedToken = hashToken(token);

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.refreshToken, hashedToken));

  if (!user) {
    throw ApiError.notFound("Session not found. Please login again");
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });

  return accessToken;
};


const logout = async (userId: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId));

  if (!user) {
    throw ApiError.notFound("User not found. Please login again");
  }

  await db
    .update(userTable)
    .set({ refreshToken: null })
    .where(eq(userTable.id, userId));
};

export { register, login, issueAccessToken, logout };