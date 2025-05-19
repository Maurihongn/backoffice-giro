export default function Layout({ children }: { children: React.ReactNode }) {
  console.log("Available env keys:", Object.keys(process.env));

  // Registrar las variables de entorno relevantes para diagnóstico
  console.log({
    ENV: process.env.ENV,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    NOTIFICATIONHUB_URL: process.env.NOTIFICATIONHUB_URL,
    MAINTENANCEHUB_URL: process.env.MAINTENANCEHUB_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  });
  return (
    <section className="h-screen flex flex-col items-center justify-center p-4">
      {children}
    </section>
  );
}
