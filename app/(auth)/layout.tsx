export default function Layout({ children }: { children: React.ReactNode }) {
  const environment = process.env.ENV;
  return (
    <section className="h-screen flex flex-col items-center justify-center p-4">
      {environment === "development" && <pre>{environment}</pre>}
      {children}
    </section>
  );
}
