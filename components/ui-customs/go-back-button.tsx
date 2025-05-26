"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  href?: string;
  title?: string;
};
export default function GoBackButton({ href, title = "Volver" }: Props) {
  return (
    <Button asChild variant="ghost" className="">
      <Link href={href || "/"} className="flex gap-2">
        <ArrowLeft className="h-4 w-4" />

        <span className="font-semibold hidden md:inline">{title}</span>
      </Link>
    </Button>
  );
}
