export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-volkswagen-blue text-white p-4">
        <h1 className="text-2xl">Volkswagen - Car Inventory</h1>
      </header>
      <div className="container mx-auto px-4 py-4">
        <main className="flex-grow p-4">{children}</main>
      </div>
      <footer className="bg-volkswagen-blue text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
}
