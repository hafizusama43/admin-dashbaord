import { getProducts } from "@/server/data/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // const body = await request.json(); // Parse the request body
        const body: Record<string, any> = {};
        const search = body.q ?? "";
        const offset = body.offset ?? 0;
        const products = await getProducts(search, offset);
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error getting:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
