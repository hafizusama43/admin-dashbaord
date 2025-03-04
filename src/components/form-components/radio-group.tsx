import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { CircleHelp } from "lucide-react";
import CustomTooltip from "../ui/custom-tooltip";

interface RadioOption {
  value: number;
  label: string;
}

interface RenderRadioGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: RadioOption[];
  helpText?: string; // Added optional helpText prop
}

export const RenderRadioGroup = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  helpText, // Destructuring helpText prop
}: RenderRadioGroupProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            &nbsp;
            {helpText && (
              <CustomTooltip title={helpText}>
                <CircleHelp className="mb-[2px] inline h-3 w-3 cursor-pointer !text-blue-600" />
              </CustomTooltip>
            )}
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value?.toString()}
              onValueChange={(e) => {
                field.onChange(Number(e));
                console.log(e);
              }}
            >
              {options.map((option, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={option.value.toString()} id={`${name}-${index}`} />
                  <Label htmlFor={`${name}-${index}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
