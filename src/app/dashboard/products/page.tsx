import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "../../../components/products/products-table";
import React from "react";
import ProdutDeleteDialog from "@/components/products/product-delete";
import ProductDetails from "@/components/products/product-details";

export default async function ProductsPage(props: { searchParams: Promise<{ q: string; offset: string }>; }) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = Number(searchParams.offset) > 0 ? Number(searchParams.offset) : 0;

  return (
    <React.Fragment>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
          </Button>
        </div>
      </div>
      <div>
        <ProductsTable offset={offset ?? 0} search={search} />
      </div>
      <ProdutDeleteDialog />
      <ProductDetails />
    </React.Fragment>
  );
}
