import { NavLink, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 max-w-screen-2xl mx-auto">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Volkswagen - Car Inventory</h1>
        <nav className="flex gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "font-bold underline" : ""
            }
          >
            Cars
          </NavLink>
          <NavLink
            to="/workshops"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : ""
            }
          >
            Workshops
          </NavLink>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="text-center text-xs mt-8">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
};
