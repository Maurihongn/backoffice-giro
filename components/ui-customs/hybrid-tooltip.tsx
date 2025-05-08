import { PopoverProps } from "@radix-ui/react-popover";
import { TooltipProps, TooltipProviderProps } from "@radix-ui/react-tooltip";
import { ComponentProps, createContext, useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
// import { useScreenSize } from "@/hooks/useScreenSize";
import { useIsMobile } from "@/hooks/use-mobile";

// Definir el contexto
const HybridTooltipContext = createContext<{ isMobile: boolean } | undefined>(
  undefined
);

// Hook para consumir el contexto
export function useHybridTooltipContext() {
  const context = useContext(HybridTooltipContext);
  if (!context) {
    throw new Error(
      "useHybridTooltipContext debe ser usado dentro de HybridTooltipProvider"
    );
  }
  return context;
}

type Props = {
  tootipProps?: {
    tooltipPovidderProps?: Omit<TooltipProviderProps, "children">;
    tooltipProps?: TooltipProps;
  };
  popoverProps?: PopoverProps;
  children?: React.ReactNode;
};
export function HybridTooltip({ children, tootipProps, popoverProps }: Props) {
  const isMobile = useIsMobile();

  return (
    <HybridTooltipContext.Provider value={{ isMobile }}>
      {!isMobile ? (
        <TooltipProvider
          {...tootipProps?.tooltipPovidderProps}
          children={
            <Tooltip {...tootipProps?.tooltipProps}>{children}</Tooltip>
          }
        />
      ) : (
        <Popover {...popoverProps}>{children}</Popover>
      )}
    </HybridTooltipContext.Provider>
  );
}

type HybridTooltipTriggerProps = {
  children: React.ReactNode;
} & ComponentProps<typeof TooltipTrigger> &
  ComponentProps<typeof PopoverTrigger>;

export function HybridTooltipTrigger({
  children,
  ...rest
}: HybridTooltipTriggerProps) {
  const { isMobile } = useHybridTooltipContext();
  return !isMobile ? (
    <TooltipTrigger {...rest}>{children}</TooltipTrigger>
  ) : (
    <PopoverTrigger {...rest}>{children}</PopoverTrigger>
  );
}

type HybridTooltipContentProps = {
  children: React.ReactNode;
} & ComponentProps<typeof TooltipContent> &
  ComponentProps<typeof PopoverContent>;

export function HybridTooltipContent({ children }: HybridTooltipContentProps) {
  const { isMobile } = useHybridTooltipContext();
  return !isMobile ? (
    <TooltipContent>{children}</TooltipContent>
  ) : (
    <PopoverContent>{children}</PopoverContent>
  );
}
