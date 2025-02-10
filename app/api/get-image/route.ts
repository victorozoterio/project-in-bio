import { NextResponse } from "next/server";
import { getDownloadURLFromPath } from "@/app/lib/firebase";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const imagePath = url.searchParams.get("path");

	if (!imagePath) {
		return NextResponse.json(
			{ error: "No image path provided" },
			{ status: 400 },
		);
	}

	try {
		const imageUrl = await getDownloadURLFromPath(imagePath);
		return NextResponse.json({ url: imageUrl });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
