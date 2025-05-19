import { Suspense } from "react";
import SignInForm from "./_components/SignInForm";

export default function Page() {
  const environment = process.env.ENV;
  return (
    <div className="relative overflow-y-auto w-full flex items-center justify-center p-4">
      <pre>
        {environment}
      </pre>
      <div className="z-10">
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
