'use client'
import React from 'react'
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from '@/lib/store/hooks';
import { setProductSliceBits } from '@/lib/store/features/productsSlice';

const AddProductBtn = () => {
    const dispatch = useAppDispatch();

    const handleAddProduct = () => {
        dispatch(setProductSliceBits({ bitToSet: "showEditModal", value: true }))
    }

    return (
        <Button size="sm" className="h-8 gap-1" onClick={() => handleAddProduct()}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
        </Button>
    )
}

export default AddProductBtn