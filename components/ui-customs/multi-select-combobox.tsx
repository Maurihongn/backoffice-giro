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
  value: Item[];
  onChange: (selectedValues: Item[]) => void;
  label?: string;
  placeholder?: string;
  noResultsMessage?: string;
  selectedMessage?: string;
};

export default function MultiSelectCombobox({
  data = [],
  onChange,
  label,
  value,
  placeholder,
  noResultsMessage = "No results found",
  selectedMessage = "Selected items",
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  // const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  // Get the labels of selected items
  const selectedLabels = React.useMemo(() => {
    if (value.length === 0) return [];

    return data
      .filter((item) => value.some((v) => v.value === item.value))
      .map((item) => item.label);
  }, [value]);

  // Toggle selection of an item
  const toggleItem = (item: string) => {
    const result = value.some((v) => v.value === item);

    if (result) {
      // If the item is already selected, remove it
      onChange(value.filter((v) => v.value !== item));
    } else {
      // If the item is not selected, add it
      onChange([...value, { value: item, label: item }]);
    }
  };

  // Remove a selected item
  const removeItem = (item: string) => {
    const result = value.some((v) => v.value === item);
    if (result) {
      // If the item is already selected, remove it
      onChange(value.filter((v) => v.value !== item));
    }
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0 ? `${value.length} seleccionados` : label}
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
                        checked={
                          value.some((v) => v.value === item.value)
                            ? true
                            : false
                        }
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
                <Button
                  onClick={() => {
                    const value = data.find((f) => f.label === label)?.value;
                    if (value) removeItem(value);
                  }}
                  variant="ghost"
                  // size="icon"
                  size={'sm'}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
