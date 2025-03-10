import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import { hash } from "bcrypt";
import * as z from 'zod';

// Define a schema for input validation 
const UserSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(req:Request) {
    try{
        const body= await req.json();
        const { email, username ,password } = UserSchema.parse(body);
        // check if email already exists
        const existingUserByEmail =await db.user.findUnique(
            { 
                where: {email: email}
            }); 
            if (existingUserByEmail){
                return NextResponse.json({ user:null,message: "User with this email already exist"},{status:409})
            }
            const hashedPassword = await hash(password, 10);
            const newUser =await db.user.create({
                data:{
                    username,
                    email,
                    password: hashedPassword
                }
            })
        return NextResponse.json({user : newUser, message: "user created succesfully"}, {status:201});
    }catch(error){
        return NextResponse.json({message: "Somthing went wrong!"}, {status:201});

         
    }
}