import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
        <Link href="/sign-in" className="">
          Inicio de sesion
        </Link>

        <Button variant={"default"} className="mt-4">
          Primario
        </Button>
        <Button variant={"secondary"} className="mt-4 ">
          Secundario
        </Button>
        <Button variant={"destructive"} className="mt-4">
          Destructivo
        </Button>
        <Button variant={"outline"} className="mt-4">
          Contorno
        </Button>
        <Button variant={"ghost"} className="mt-4">
          Fantasma
        </Button>
      </CardContent>
    </Card>
  );
}
