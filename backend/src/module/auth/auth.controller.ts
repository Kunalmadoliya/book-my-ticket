import * as authService from "./auth.service";
import type {Request, Response} from "express";
import {RegisterDto} from "./dto/register.dto";
import {ApiError} from "../../common/utils/api-error";
import {ApiResponse} from "../../common/utils/api-response";
import {LoginDto} from "./dto/login.dto";

const register = async (req: Request, res: Response) => {
  const {error, value} = RegisterDto.validate(req.body);

  if (error) {
    throw ApiError.unauthorized(error.join(", "));
  }

  if (!value) {
    throw ApiError.unauthorized("Please Register Again");
  }

  const user = await authService.register(value);

  return ApiResponse.ok(res, "User Created", user);
};

const login = async (req: Request, res: Response) => {
  const {error, value} = LoginDto.validate(req.body);

  if (!value) {
    throw ApiError.unauthorized(error?.join(", "));
  }

  if (error) {
    throw ApiError.unauthorized("Register Again");
  }

  const user = await authService.login(value);
  return ApiResponse.ok(res, "Logged in successfully", user);
};

export {register, login};
