export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="h-screen flex flex-col items-center justify-center p-4">
            {children}
        </section>
    );
}