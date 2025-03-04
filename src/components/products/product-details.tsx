'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { setProductSliceBits } from "@/lib/store/features/productsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Image from "next/image"

const ProductDetails = () => {
    const dispatch = useAppDispatch();

    const { showViewModal, product } = useAppSelector((state) => state.product);
    const handleOpenChange = () => {
        dispatch(setProductSliceBits({ bitToSet: "showViewModal", value: false }))
        dispatch(setProductSliceBits({ bitToSet: "product", value: null }))
    }

    return (
        <Sheet open={showViewModal} onOpenChange={() => { handleOpenChange() }}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{product?.name}</SheetTitle>
                    <SheetDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium corrupti quasi nesciunt temporibus nobis, atque veniam.
                    </SheetDescription>
                </SheetHeader>
                {/* <div className="grid gap-4 py-4"> */}
                {product &&
                    <Image
                        alt="Product image"
                        height="10"
                        src={product.imageUrl}
                        width="100"
                        className="aspect-square rounded-md object-cover w-full my-5"
                    />
                }
                <div className="flex flex-col gap-1">
                    <span><strong>Price</strong> : {product?.price}</span>
                    <span><strong>Stock</strong> : {product?.stock}</span>
                    <span><strong>Status</strong> : {product?.status}</span>
                    <span><strong>Date added</strong> : {new Date(product?.availableAt ?? new Date()).toLocaleDateString("en-US")}</span>
                </div>
                {/* </div> */}
            </SheetContent>
        </Sheet>
    )
}

export default ProductDetails

