'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { setProductSliceBits } from "@/lib/store/features/productsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { RenderInput } from "../form-components/input";
import { useEffect, useState } from "react";
import { RenderSelect } from "../form-components/select";
import { Spin } from "../ui/spin";
import { STATUS_MAP } from "@/lib/constants";

const formSchema = z.object({
    id: z.coerce.number().optional(),
    imageUrl: z.string().min(5, { message: "Image url is required." }),
    name: z.string().min(1, { message: "Name is required." }),
    price: z.string().min(1, { message: "Price is required." }),
    status: z.string().min(1, { message: "Status is required." }),
    stock: z.coerce.number().min(0, { message: "Stock must be at least 0." })
});

const AddProductDialong = () => {
    const dispatch = useAppDispatch();
    const { showEditModal, product } = useAppSelector((state) => state.product);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            imageUrl: "",
            name: "",
            price: "",
            status: "",
            stock: 0,
        },
    });

    useEffect(() => {
        if (product && product.id > 0) {
            setIsUpdate(true)
            form.reset({
                id: product.id || 0,
                imageUrl: product.imageUrl || "",
                name: product.name || "",
                price: product.price || "",
                status: product.status || "",
                stock: product.stock ?? 0,
            });
        } else {
            setIsUpdate(false);
            form.reset({
                id: 0,
                imageUrl: "",
                name: "",
                price: "",
                status: "",
                stock: 0,
            });
        }
    }, [product, form.reset]);


    const handleOpenChange = () => {
        dispatch(setProductSliceBits({ bitToSet: "showEditModal", value: false }))
        dispatch(setProductSliceBits({ bitToSet: "product", value: null }))
        form.reset({
            id: 0,
            imageUrl: "",
            name: "",
            price: "",
            status: "",
            stock: 0,
        });
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/product";
            if (!apiUrl) throw new Error("API base URL is not defined");

            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            setLoading(false);
            handleOpenChange()
            dispatch(setProductSliceBits({ bitToSet: "reFetch", value: true }))
            toast.success("Product updated successfully!");
        } catch (error) {
            setLoading(false);
            console.error("Submit error:", error);
            toast.error("Failed to update. Please try again.");
        }
    }

    return (
        <Dialog open={showEditModal} onOpenChange={() => { handleOpenChange() }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isUpdate ? "Edit product" : "Add product"}</DialogTitle>
                    <DialogDescription>
                        {isUpdate ? "Update the product details" : "Add a new product"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={cn("flex flex-col space-y-4")}
                        >
                            <RenderInput form={form} name="imageUrl" label="Image Url" />
                            <RenderInput form={form} name="name" label="Name" />
                            <RenderSelect form={form} name="status" label="Status" options={STATUS_MAP} />
                            <div className="flex items-center gap-3">
                                <RenderInput form={form} name="price" label="Price" />
                                <RenderInput form={form} name="stock" label="Stock" type="number" />
                            </div>
                            <div className="flex justify-end mt-5">
                                <Button disabled={loading} type="submit">
                                    {loading ? <Spin size="sm" /> : "Save changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialong