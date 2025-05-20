"use client";
import FilledInput from "@/components/ui-customs/filled-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, FunnelX, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the form schema
const filterSchema = z.object({
  search: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

type Props = {};
export default function UsersFilter({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Initialize form with current search params
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update search param
    if (data.search) {
      params.set("search", data.search);
    } else {
      params.delete("search");
    }

    // Reset to page 1 when filtering
    params.set("pageNumber", "1");

    // Update URL with new params
    router.push(`${pathname}?${params.toString()}`);

    if (isDialogOpen) {
      setIsDialogOpen(false);
    }
  };

  // Handle clearing the filter
  const handleClearFilter = () => {
    form.reset({ search: "" });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("pageNumber", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const filterForm = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 w-full max-w-2xl"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full">
              <FormControl>
                <FilledInput
                  type="text"
                  label="Buscar"
                  placeholder="Nombre de usuario, apellidom nombre de usuario, rol..."
                  // className="border p-2 rounded"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            //    className="shrink-0 h-full text-xl aspect-square"
            size={"form"}
          >
            <Search />
          </Button>
          {searchParams.get("search") && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilter}
              className="h-full"
            >
              <FunnelX className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );

  // Renderizar versión móvil o escritorio según corresponda
  if (isMobile) {
    return (
      <div className="flex flex-col w-full gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size={'form'} className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filtrar usuarios</DialogTitle>
            </DialogHeader>
            {filterForm}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return filterForm;
}
