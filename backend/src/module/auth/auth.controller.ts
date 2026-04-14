import * as authService from "./auth.service";
import type {Request, Response} from "express";
import {ApiResponse} from "../../common/utils/api-response";
import {AuthRequest} from "../../types/express";
import {ApiError} from "../../common/utils/api-error";
("../../types/express");

const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);

  return ApiResponse.ok(res, "User Created", user);
};

const login = async (req: Request, res: Response) => {
  const {user, accessToken, refreshToken} = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "Login Successfull", {user, accessToken});
};

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  const accessToken = await authService.issueAccessToken(token);

  ApiResponse.ok(res, "Token Refreshed", accessToken);
};

const logout = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw ApiError.badRequest("Not able to logout at this current moment");
  }
  await authService.logout(req.user.id);

  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "Logged out successfully");
};

export {register, login, refreshToken, logout};
