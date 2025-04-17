export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <h1 className="text-2xl">Volkswagen - Car Inventory</h1>
      </header>
      <div className="container mx-auto p-4">
        <main className="flex-grow p-4">{children}</main>
      </div>
      <footer className="p-4 text-center text-xs">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
}
