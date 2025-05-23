// import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!user || !user.id || !user.firstName || !user.lastName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }
        //TODO check for subscription

        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            },
        });

        return NextResponse.json(companion);

    } catch (error) {
        console.log("[COMPANION_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }   
}