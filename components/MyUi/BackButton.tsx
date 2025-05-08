import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  children: React.ReactNode;
  href: string;
}

export const BackButton = ({ children, href }: BackButtonProps) => {
  return (
    <Button variant={"link"} asChild className="dark:text-foreground">
      <Link href={href} className="w-full text-center">
        {children}
      </Link>
    </Button>
  );
};
