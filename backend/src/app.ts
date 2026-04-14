import express from "express";
import type {Express} from "express";
import router from "./module/auth/auth.route";
import cookieParser from "cookie-parser";
import {ApiError} from "./common/utils/api-error";

export function createApplication(): Express {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    console.log("Route Hit");
    return res.json({message: "Hello how are you"});
  });

  app.use("/auth", router);

  app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
  });

  return app;
}
