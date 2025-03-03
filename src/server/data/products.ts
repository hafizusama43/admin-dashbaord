import { db } from "../db/drizzle";
import { products, SelectProduct } from "../db/schema"; // Keep schema definitions separate
import { count, eq, ilike } from "drizzle-orm";

export async function getProducts(
    search: string,
    offset: number
): Promise<{
    products: SelectProduct[];
    newOffset: number | null;
    totalProducts: number;
}> {
    // Always search the full table, not per page
    if (search) {
        return {
            products: await db
                .select()
                .from(products)
                .where(ilike(products.name, `%${search}%`))
                .limit(1000),
            newOffset: null,
            totalProducts: 0
        };
    }
    if (offset === null) {
        return { products: [], newOffset: null, totalProducts: 0 };
    }

    const totalProducts = await db.select({ count: count() }).from(products);
    const moreProducts = await db.select().from(products).limit(5).offset(offset);
    const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

    return {
        products: moreProducts,
        newOffset,
        totalProducts: totalProducts[0].count
    };
}
export async function deleteProductById(id: number) {
    await db.delete(products).where(eq(products.id, id));
}