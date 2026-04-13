import {BaseDto} from "../../../common/dto/base.dto";
import {z} from "zod";

export class LoginDto extends BaseDto {
  static schema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email").max(254),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[@$!%*?&#]/, "Must include at least one special character"),
  });
}
