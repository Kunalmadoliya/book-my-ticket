import {BaseDto} from "../../../common/dto/base.dto";
import {z} from "zod";


export class RegisterDto extends BaseDto {
  static schema = z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(45, "First name too long")
      .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),

    lastName: z
      .string()
      .trim()
      .max(45, "Last name too long")
      .regex(/^[a-zA-Z]*$/, "Last name must contain only letters")
      .optional(),

    email: z.string().trim().toLowerCase().email("Invalid email").max(254),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[@$!%*?&#]/, "Must include at least one special character"),

    role: z.enum(["guest", "user", "admin"]).default("guest"),
  });
}
