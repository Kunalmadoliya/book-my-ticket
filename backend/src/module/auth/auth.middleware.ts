import type {Request, Response, NextFunction} from "express";
import {ApiError} from "../../common/utils/api-error";
import {verifyAccessToken} from "../../common/utils/jwt.utils";
import {userTable} from "../../db/schema";
import db from "../../db/index";
import {eq} from "drizzle-orm";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw ApiError.notFound("Token not found try again later");
  }

  const decoded = verifyAccessToken(token);

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, decoded.id as string));

  if (!user) {
    throw ApiError.unauthorized("User not found");
  }

//   req.user = {};

  next();
};

const authorized = async (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};

export {authenticate, authorized};
