import { addProduct, deleteProductById, getProducts, updateProduct } from "@/server/data/products";
import { SelectProduct } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const searchParams: URLSearchParams = request.nextUrl.searchParams;
        if (!searchParams.get('productId')) {
            return NextResponse.json({ error: "Inalid product id" }, { status: 500 });
        }

        const search = searchParams.get('search') ?? "";
        const P = Number(searchParams.get('offset')) || 0; // Convert to number
        await deleteProductById(Number(searchParams.get('productId')));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error getting:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: SelectProduct = await request.json(); // Parse the request body
        if (body.id > 0) {
            await updateProduct(body);
        } else {
            await addProduct(body);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error getting:", error);
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
}
