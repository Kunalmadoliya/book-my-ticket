import express from "express";
import {Router} from "express";
import {validate} from "../../common/middleware/validate.middleware";
import {RegisterDto} from "./dto/register.dto";
import * as controller from "./auth.controller";
import { LoginDto } from "./dto/login.dto";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login" , validate(LoginDto) , controller.login)
// router.post("/refresh-token")
// router.post("/login" )

export default router;
