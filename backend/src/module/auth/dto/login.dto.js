"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const base_dto_1 = require("../../../common/dto/base.dto");
const zod_1 = require("zod");
class LoginDto extends base_dto_1.BaseDto {
    static schema = zod_1.z.object({
        email: zod_1.z.string().trim().toLowerCase().email("Invalid email").max(254),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100)
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[a-z]/, "Must include at least one lowercase letter")
            .regex(/[0-9]/, "Must include at least one number")
            .regex(/[@$!%*?&#]/, "Must include at least one special character"),
    });
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map