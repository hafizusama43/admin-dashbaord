import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import React from "react";
import CustomTooltip from "../ui/custom-tooltip";

interface RenderDatePickerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  helpText?: string;
}

export const RenderDatePicker = <T extends FieldValues>({
  form,
  name,
  label,
  disabled = false,
  helpText = "",
}: RenderDatePickerProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {label}&nbsp;
            {helpText && (
              <CustomTooltip title={helpText}>
                <CircleHelp className="mb-[2px] inline h-3 w-3 cursor-pointer !text-blue-600" />
              </CustomTooltip>
            )}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "h-10 pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
