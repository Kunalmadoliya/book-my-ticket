import express from "express";
import type {Express} from "express";
import router from "./module/auth/auth.route";
import cookieParser from "cookie-parser";
import {ApiError} from "./common/utils/api-error";
import cors from 'cors'

export function createApplication(): Express {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}));

  app.get("/", (req, res) => {
    return res.json({message: "Server running"});
  });

  app.use("/auth", router);

  app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
  });

  return app;
}