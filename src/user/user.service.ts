import { CreateUserDto } from "./schema/user.schema.ts";
import { UserModel } from "./models/user.model.ts";
import bcrypt from "bcrypt";

export const createUser = async (createUserDto: CreateUserDto) => {
    const hassedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await UserModel.create({ ...createUserDto, password: hassedPassword });
    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
};