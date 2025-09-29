import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authToken = req.cookies.get("authToken")?.value;

    if (!authToken) {
        return NextResponse.json({ loggedIn: false }, { status: 200 });
    }

    try {
        return NextResponse.json({
            loggedIn: true,
        }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
}
