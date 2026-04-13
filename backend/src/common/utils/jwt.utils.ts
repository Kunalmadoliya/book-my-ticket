import crypto from "crypto";
import jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";
import {ApiError} from "./api-error";

type UserType = {
  id: string;
  role: string;
};
const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

export const generateAccessToken = (payload: UserType) => {
  if (!accessSecret) {
    throw new Error("JWT secret missing");
  }

  return jwt.sign(payload, accessSecret, {
    expiresIn:
      (process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ||
      "15m",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

export const generateRefreshToken = (playload: {id: string}) => {
  return jwt.sign(playload, refreshSecret, {
    expiresIn:
      (process.env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ||
      "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};

export const gerateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  return {rawToken, hashToken};
};
