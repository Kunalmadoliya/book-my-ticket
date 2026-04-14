"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const base_dto_1 = require("../../../common/dto/base.dto");
const zod_1 = require("zod");
class RegisterDto extends base_dto_1.BaseDto {
    static schema = zod_1.z.object({
        firstName: zod_1.z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters")
            .max(45, "First name too long")
            .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
        lastName: zod_1.z
            .string()
            .trim()
            .max(45, "Last name too long")
            .regex(/^[a-zA-Z]*$/, "Last name must contain only letters")
            .optional(),
        email: zod_1.z.string().trim().toLowerCase().email("Invalid email").max(254),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100)
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[a-z]/, "Must include at least one lowercase letter")
            .regex(/[0-9]/, "Must include at least one number")
            .regex(/[@$!%*?&#]/, "Must include at least one special character"),
        role: zod_1.z.enum(["guest", "user", "admin"]).default("guest"),
    });
}
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map