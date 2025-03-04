"use client";

import { TableHead, TableRow, TableHeader, TableBody, Table, TableCell } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getProducts, setProductSliceBits } from "@/lib/store/features/productsSlice";
import { Product } from "./product";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsTable({ offset, search, }: { offset: string; search: string; }) {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ offset, search }));

    return () => {
      dispatch(setProductSliceBits({ bitToSet: "products", value: [] }));
    }
  }, [])


  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Manage your products and view their sales performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Total Sales</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "loading" ?
              <React.Fragment>
                {Array.from({ length: 7 }, (_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
              :
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardFooter>
        <form className="flex w-full items-center justify-between">
          <div className="text-muted-foreground text-xs">
            Showing{" "}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{" "}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter> */}
    </Card>
  );
}
