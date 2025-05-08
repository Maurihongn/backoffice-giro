"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: any;
}

export interface FilledSelectProps {
  label?: string;
  shrink?: boolean;
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onValueChange?: (value: any) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  options?: SelectOption[];
}

const FilledSelect = React.forwardRef<HTMLDivElement, FilledSelectProps>(
  (
    {
      label,
      shrink,
      error,
      startAdornment,
      endAdornment,
      className,
      children,
      onValueChange,
      options,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!props.value || !!props.defaultValue
    );

    // Check if there's a value to determine if label should shrink
    const shouldShrink = shrink || isFocused || hasValue;

    return (
      <Select
        onValueChange={(value) => {
          setHasValue(!!value);
          if (onValueChange) {
            onValueChange(value);
          }
        }}
        {...props}
      >
        <div className="relative w-full" ref={ref}>
          <SelectTrigger
            // className={`
            //   ${className}
            //   min-h-[56px]
            //   px-3
            //   pt-4
            //   pb-1
            //   bg-gray-100
            //   hover:bg-gray-200
            //   border-b-2
            //   border-t-0
            //   border-x-0
            //   rounded-t-md
            //   rounded-b-none
            //   focus:ring-0
            //   focus:border-b-2
            //   ${error ? "border-red-500 focus:border-red-500" : "focus:border-primary"}
            // `}
            className={cn(
              "w-full min-h-12 rounded-md border border-input bg-background px-3 py-2 pt-6 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed autofill:bg-foreground/30 disabled:opacity-50",
              className,
            //   isFocused && "border-primary",
              error && "border-destructive"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="flex w-full justify-between h-full">
              <div className="flex flex-1">
                {startAdornment}
                <div className="flex-1">
                  {label && (
                    <label
                      className={`
                        absolute 
                        transition-all 
                        duration-200 
                        pointer-events-none
                        ${
                          shouldShrink
                            ? "text-xs top-1 left-3"
                            : "text-muted-foreground text-sm top-[18px] left-3"
                        }
                        ${
                          error
                            ? "text-red-500"
                            : isFocused
                            ? "text-primary"
                            : ""
                        }
                      `}
                    >
                      {label}
                    </label>
                  )}
                  <div className={cn("flex items-start justify-between", )}>
                    <SelectValue placeholder=" " className="bg-red-500" />
                  </div>
                </div>
              </div>
              {endAdornment}
            </div>
          </SelectTrigger>
        </div>
        <SelectContent>
          {options ? (
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ) : (
            children
          )}
        </SelectContent>
      </Select>
    );
  }
);

FilledSelect.displayName = "FilledSelect";

export { FilledSelect };
