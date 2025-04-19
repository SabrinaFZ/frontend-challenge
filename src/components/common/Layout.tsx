import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-4 max-w-screen-2xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl">Volkswagen - Car Inventory</h1>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="text-center text-xs mt-8">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
}
