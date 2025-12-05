import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "./user.types";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({ required: true })
    firstName:string;
    @Prop({ required: true })
    lastname:string;
    @Prop({ required: true, unique: true, trim: true, })
    email:string;
    @Prop({ required: true })
    password:string;
    @Prop({ default: Role.Student })
    role:string;

}


export const UserSchema = SchemaFactory.createForClass(User);