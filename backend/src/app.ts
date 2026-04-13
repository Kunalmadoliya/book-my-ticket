import express from "express";
import type {Express} from "express";
import router  from "./module/auth/auth.route";

export function createApplication(): Express {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    console.log("Route Hit");
    return res.json({message: "Hello how are you"});
  });

  app.use("/auth" , router)

  return app;
}
