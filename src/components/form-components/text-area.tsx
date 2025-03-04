import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CircleHelp } from "lucide-react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import CustomTooltip from "../ui/custom-tooltip";

interface RenderTextAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
}

export const RenderTextArea = <T extends FieldValues>({
  form,
  name,
  label,
  disabled = false,
  placeholder = "Please enter text here",
  helpText = "",
}: RenderTextAreaProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}&nbsp;
            {helpText && (
              <CustomTooltip title={helpText}>
                <CircleHelp className="mb-[2px] inline h-3 w-3 cursor-pointer !text-blue-600" />
              </CustomTooltip>
            )}
          </FormLabel>
          <FormControl>
            <Textarea rows={10} placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
