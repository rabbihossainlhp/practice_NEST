import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { Lavel } from "./course.type";

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
    @Prop({ required: true })
        name:string;
        @Prop({ required: true })
        description:string;
        @Prop({ required: true })
        price:string;
        @Prop({ required: true , default: Lavel.Beginner })
        lavel:string;

}


export const CourseSchema = SchemaFactory.createForClass(Course);