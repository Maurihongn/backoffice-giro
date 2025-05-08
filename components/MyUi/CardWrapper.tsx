import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  title?: string;
  backButtonHref?: string;
  backButtonMessage?: string;
  className?: string;
}

export const CardWrapper = ({
  children,
  title,
  backButtonHref,
  backButtonMessage,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("w-full max-w-xs sm:w-96", className)}>
      {title && (
        <CardHeader>
          <header>
            <h1 className="text-2xl font-bold">{title}</h1>
          </header>
        </CardHeader>
      )}

      <CardContent>
        {children}
        {backButtonHref && (
          <BackButton href={backButtonHref}>{backButtonMessage}</BackButton>
        )}
      </CardContent>
    </Card>
  );
};
