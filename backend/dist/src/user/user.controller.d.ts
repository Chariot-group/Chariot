import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): string;
    findAll(page?: number, offset?: number, sort?: string, email?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}> & import("./schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            offset: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}> & import("./schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}> & import("./schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}> & import("./schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
