'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectProduct } from "@/server/db/schema";
import { useAppDispatch } from "@/lib/store/hooks";
import { setProductSliceBits } from "@/lib/store/features/productsSlice";

export function Product({ product }: { product: SelectProduct }) {
  const dispatch = useAppDispatch();

  const handleEditProduct = (productId: number) => {
    dispatch(setProductSliceBits({ bitToSet: "product", value: product }))
    dispatch(setProductSliceBits({ bitToSet: "showEditModal", value: true }))
    console.log("Edit product with id: ", productId);
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(setProductSliceBits({ bitToSet: "product", value: product }))
    dispatch(setProductSliceBits({ bitToSet: "showDeleteModal", value: true }))
    console.log("Delete product with id: ", productId);
  };

  const handleViewProduct = (productId: number) => {
    dispatch(setProductSliceBits({ bitToSet: "product", value: product }))
    dispatch(setProductSliceBits({ bitToSet: "showViewModal", value: true }))
    console.log("View product with id: ", productId);
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(product.availableAt).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleViewProduct(product.id) }}><Eye /> View</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleEditProduct(product.id) }}><Edit /> Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleDeleteProduct(product.id) }}><Trash2 /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
