import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET =async (req:Request) => {
    const sessison= await getServerSession(authOptions);
    return NextResponse.json ({ authentification: !!sessison})
}