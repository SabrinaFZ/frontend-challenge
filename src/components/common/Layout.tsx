import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="mb-4">
        <h1 className="text-2xl">Volkswagen - Car Inventory</h1>
      </header>
      <div className="container">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <footer className="text-center text-xs mt-8">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
}
