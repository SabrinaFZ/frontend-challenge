const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2 select-none">
      <div
        className="text-8xl font-bold text-[#001e50]/8 leading-none"
        style={{ fontFamily: "Barlow, system-ui, sans-serif" }}
      >
        404
      </div>
      <h1
        className="text-xl font-semibold text-foreground -mt-2"
        style={{ fontFamily: "Barlow, system-ui, sans-serif" }}
      >
        Page not found
      </h1>
      <p className="text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
};

export default NotFound;
