"use client";

import { TableHead, TableRow, TableHeader, TableBody, Table, TableCell } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getProducts, setProductSliceBits } from "@/lib/store/features/productsSlice";
import { Product } from "./product";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductsTable({ offset: initialOffset, search }: { offset: number; search: string }) {
  const dispatch = useAppDispatch();
  const productsPerPage = 5; // Adjust this based on your API's pagination

  const { products, status, totalProducts } = useAppSelector((state) => state.product);
  const [offset, setOffset] = useState(initialOffset || productsPerPage);

  useEffect(() => {
    dispatch(getProducts({ offset, search }));

    return () => {
      dispatch(setProductSliceBits({ bitToSet: "products", value: [] }));
    }
  }, [offset])


  const handlePrev = () => {
    setOffset((prev) => Math.max(productsPerPage, prev - productsPerPage));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(prev + productsPerPage, totalProducts));
  };

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
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground text-xs">
            Showing{" "}
            <strong>
              {Math.max(0, offset - productsPerPage + 1)}-{Math.min(offset, totalProducts)}
            </strong>{" "}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button variant="ghost" size="sm" onClick={handlePrev} disabled={offset === productsPerPage}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNext} disabled={offset >= totalProducts}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
