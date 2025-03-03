import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CircleHelp } from "lucide-react"
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import CustomTooltip from "../ui/custom-tooltip";


interface RenderInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    disabled?: boolean;
    type?: "text" | "number";
    helpText?: string;
}

export const RenderInput = <T extends FieldValues>({
    form,
    name,
    label = "",
    disabled = false,
    type = "text",
    helpText = "",
}: RenderInputProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}&nbsp;
                        {helpText && <CustomTooltip title={helpText}>
                            <CircleHelp className="inline !text-blue-600 h-3 w-3 mb-[2px] cursor-pointer" />
                        </CustomTooltip>}
                    </FormLabel>}
                    <FormControl>
                        <Input type={type === 'number' ? "number" : "text"} disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}