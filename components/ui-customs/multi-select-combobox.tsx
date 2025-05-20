"use client";

import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Item = {
  value: string;
  label: string;
};

type MultiSelectComboboxProps = {
  data: Item[];
  onChange: (selectedValues: string[]) => void;
  label?: string;
  placeholder?: string;
  noResultsMessage?: string;
  selectedMessage?: string;
};

export default function MultiSelectCombobox({
  data = [],
  onChange,
  label,
  placeholder,
  noResultsMessage = "No results found",
  selectedMessage = "Selected items",
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  // Get the labels of selected items
  const selectedLabels = React.useMemo(() => {
    if (selectedValues.length === 0) return [];

    return data
      .filter((item) => selectedValues.includes(item.value))
      .map((item) => item.label);
  }, [selectedValues]);

  // Toggle selection of an item
  const toggleItem = (value: string) => {
    setSelectedValues((current) => {
      if (current.includes(value)) {
        return current.filter((item) => item !== value);
      } else {
        return [...current, value];
      }
    });
  };

  // Remove a selected item
  const removeItem = (value: string) => {
    setSelectedValues((current) => current.filter((item) => item !== value));
  };

  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} seleccionados`
              : label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.length === 0 ? (
                  <CommandItem disabled>{noResultsMessage}</CommandItem>
                ) : (
                  data.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => toggleItem(item.value)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={selectedValues.includes(item.value)}
                        onCheckedChange={() => toggleItem(item.value)}
                        aria-label={`Select ${item.label}`}
                        className="mr-2 h-4 w-4"
                      />
                      {item.label}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display selected items */}
      {selectedLabels.length > 0 && (
        <div className="mt-3">
          <div className="text-sm text-muted-foreground mb-2">
            {selectedMessage}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((label, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    const value = data.find((f) => f.label === label)?.value;
                    if (value) removeItem(value);
                  }}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
