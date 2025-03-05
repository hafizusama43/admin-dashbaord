import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleHelp } from "lucide-react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import CustomTooltip from "../ui/custom-tooltip";
import clsx from "clsx";

interface Options {
  [key: string]: string;
}

interface RenderSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: Options;
  helpText?: string;
  placeholder?: string;
}

export const RenderSelect = <T extends FieldValues>({
  form,
  name,
  label = "",
  options,
  helpText = "",
  placeholder = "Please select one of the options",
}: RenderSelectProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}&nbsp;
              {helpText && (
                <CustomTooltip title={helpText}>
                  <CircleHelp className="mb-[2px] inline h-3 w-3 cursor-pointer !text-blue-600" />
                </CustomTooltip>
              )}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className={clsx("", { "mt-1": label })}>
                <SelectValue
                  placeholder={placeholder ? placeholder : "Please select one of the options"}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(options).map((item, index) => (
                <SelectItem key={index} value={item}>
                  {options[item]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
