import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { CircleHelp } from "lucide-react";
import CustomTooltip from "../ui/custom-tooltip";

interface RenderCheckboxGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  items: Record<string, string>; // Accepts key-value pairs for checkbox labels
  helpText?: string; // Optional helpText prop for tooltips
}

export const RenderCheckboxGroup = <T extends FieldValues>({
  form,
  name,
  items,
  label,
  helpText, // Destructuring helpText prop
}: RenderCheckboxGroupProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">
              {label}&nbsp;
              {helpText && (
                <CustomTooltip title={helpText}>
                  <CircleHelp className="mb-[2px] inline h-3 w-3 cursor-pointer !text-blue-600" />
                </CustomTooltip>
              )}
            </FormLabel>
          </div>
          {Object.keys(items).map((item) => (
            <FormItem key={item} className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <input
                  type="checkbox"
                  checked={Array.isArray(field.value) && field.value.includes(item)} // Safeguard against undefined values
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;

                    // Ensure field.value is always an array
                    const currentValue = Array.isArray(field.value) ? field.value : [];

                    if (checked) {
                      field.onChange([...currentValue, item]);
                    } else {
                      const filtered = currentValue.filter((value) => value !== item);
                      field.onChange(filtered);
                    }
                  }}
                />
              </FormControl>
              <FormLabel className="font-normal">{items[item]}</FormLabel>
            </FormItem>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
