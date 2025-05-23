// import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { companionId: string } }

    ) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;
        
        if (!params.companionId) {
            return new NextResponse("Companion ID is required", { status: 400 });
        }

        if (!user || !user.id || !user.firstName || !user.lastName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }
        //TODO check for subscription

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId,
                userId: user.id
            },
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
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }   
}

export async function DELETE(
    request: Request,
    { params }: { params: { companionId: string } }
    ) {
    try {
        const userId = await currentUser();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.companionId) {
            return new NextResponse("Companion ID is required", { status: 400 });
        }

        const companion = await prismadb.companion.delete({
            where: {
                userId: userId.id,
                id: params.companionId
            },
        });

        return NextResponse.json(companion);

    } catch (error) {
        console.log("[COMPANION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }   
}