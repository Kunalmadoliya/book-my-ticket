import { BaseDto } from "../../../common/dto/base.dto";
import { z } from "zod";
export declare class LoginDto extends BaseDto {
    static schema: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=login.dto.d.ts.map