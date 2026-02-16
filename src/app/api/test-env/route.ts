
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            dbStatus: "Connected",
            hasAuthSecret: !!process.env.AUTH_SECRET,
            authSecretLength: process.env.AUTH_SECRET?.length,
            nodeEnv: process.env.NODE_ENV,
        });
    } catch (error) {
        return NextResponse.json({
            dbStatus: "Failed",
            error: String(error),
            hasAuthSecret: !!process.env.AUTH_SECRET,
        }, { status: 500 });
    }
}
