import { getProducts } from "@/server/data/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams: URLSearchParams = request.nextUrl.searchParams;
        console.log(searchParams);

        const search = searchParams.get('search') ?? "";
        const offset = Number(searchParams.get('offset')) || 0; // Convert to number
        const products = await getProducts(search, offset);
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error getting:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
