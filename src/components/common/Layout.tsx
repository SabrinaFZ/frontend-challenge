import { NavLink, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-[#001e50] sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-white font-bold text-base tracking-tight"
              style={{ fontFamily: "Barlow, system-ui, sans-serif" }}
            >
              Volkswagen
            </span>
            <span className="text-white/25 font-light text-lg leading-none">|</span>
            <span className="text-white/50 text-[11px] font-medium tracking-[0.2em] uppercase">
              Fleet
            </span>
          </div>
          <nav className="flex items-center gap-0.5">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Cars
            </NavLink>
            <NavLink
              to="/workshops"
              className={({ isActive }) =>
                `px-3.5 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Workshops
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-screen-2xl mx-auto w-full px-6 py-6">
        <Outlet />
      </main>
      <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Car Inventory
      </footer>
    </div>
  );
};
