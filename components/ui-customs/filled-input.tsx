'use client'
import React, { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface FilledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  shrink?: boolean;
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const FilledInput = React.forwardRef<HTMLInputElement, FilledInputProps>(
  (
    {
      className,
      label,
      shrink = false,
      error = false,
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Check if input has value
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    // Label should be floating if: input is focused OR has value OR shrink prop is true
    const shouldFloat = isFocused || hasValue || shrink;

    return (
      <div className="relative w-full">
        {startAdornment && (
          <div className="absolute top-0 bottom-0 left-0 z-20 text-muted-foreground p-1 w-12 flex items-center justify-center">
            <div className="h-10 w-10">{startAdornment}</div>
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            "transition-all duration-200",
            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pt-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed autofill:bg-foreground/30 disabled:opacity-50",
            endAdornment ? "pr-10" : "pr-3",
            startAdornment ? "pl-10" : "pl-3",
            error ? "border-destructive" : "border-input",

            className
          )}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={handleChange}
          placeholder={shouldFloat ? props.placeholder : ""}
        />
        {endAdornment && (
          <div className="absolute top-0 bottom-0 right-0 z-20 text-muted-foreground p-1 w-12 flex items-center justify-center">
            <div className="h-10 w-10">{endAdornment}</div>
          </div>
        )}
        <label
          className={cn(
            "absolute top-1/2 -translate-y-1/2 left-3 transition-all duration-200",
            startAdornment ? "left-10" : "left-3",
            error ? "text-destructive" : "text-foreground",
            shouldFloat
              ? "transform top-0 translate-y-0 scale-70"
              : "transform scale-100",
            "pointer-events-none origin-[0]"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FilledInput.displayName = "FilledInput";

export default FilledInput;
