import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-1">
      <Loader2 className="w-16 h-16 animate-spin text-accent-foreground" />
    </div>
  );
};
