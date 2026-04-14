import { BaseDto } from "../../../common/dto/base.dto";
import { z } from "zod";
export declare class RegisterDto extends BaseDto {
    static schema: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodDefault<z.ZodEnum<{
            guest: "guest";
            user: "user";
            admin: "admin";
        }>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=register.dto.d.ts.map