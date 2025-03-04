'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { deleteProduct, setProductSliceBits } from '@/lib/store/features/productsSlice';


const ProdutDeleteDialog = () => {
    const dispatch = useAppDispatch();
    const { showDeleteModal, product } = useAppSelector((state) => state.product);

    const handleCancelDelete = () => {
        dispatch(setProductSliceBits({ bitToSet: "showDeleteModal", value: false }))
        dispatch(setProductSliceBits({ bitToSet: "product", value: null }))
    }

    const handleDeleteProduct = () => {
        dispatch(setProductSliceBits({ bitToSet: "showDeleteModal", value: false }))
        if (product) {
            dispatch(deleteProduct({ productId: product?.id }))
            dispatch(setProductSliceBits({ bitToSet: "product", value: null }))
        }
    }

    return (
        <AlertDialog open={showDeleteModal}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete product <strong>{product?.name}</strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => handleCancelDelete()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteProduct()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ProdutDeleteDialog