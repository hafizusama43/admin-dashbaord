import { ProductsTable } from "../../../components/products/products-table";
import React from "react";
import ProdutDeleteDialog from "@/components/products/product-delete";
import ProductDetails from "@/components/products/product-details";
import AddProductDialong from "@/components/products/product-add";
import AddProductBtn from "./add-product-btn";

export default async function ProductsPage(props: { searchParams: Promise<{ q: string; offset: string }>; }) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = Number(searchParams.offset) > 0 ? Number(searchParams.offset) : 0;

  return (
    <React.Fragment>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <AddProductBtn />
        </div>
      </div>
      <div>
        <ProductsTable offset={offset ?? 0} search={search} />
      </div>
      <ProdutDeleteDialog />
      <ProductDetails />
      <AddProductDialong />
    </React.Fragment>
  );
}
