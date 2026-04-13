import {userTable} from "../../db/schema";
import db from "../../db/index";
import {eq} from "drizzle-orm";
import {ApiError} from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefreshToken,
  gerateResetToken,
} from "../../common/utils/jwt.utils";
import bcrypt from "bcryptjs";
import crypto from "crypto"


const hashToken = (token : string) =>
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
    throw ApiError.badRequest("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const {rawToken, hashToken} = gerateResetToken();

  const [user] = await db
    .insert(userTable)
    .values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: hashToken,
    })
    .returning({id: userTable.id});

  return user;
}
const login = async ({email, password}: {email: string; password: string}) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw ApiError.forbidden("Invalid email or password");
  }
 
  const accessToken = generateAccessToken({id : user.id , role : user.role })
  const refreshToken = generateRefreshToken({id : user.id})

  user.refreshToken = hashToken(refreshToken)

  await db.update(userTable).set({refreshToken : user.refreshToken}).where(eq(userTable.id , user.id))

  return user
};

export {register, login};
