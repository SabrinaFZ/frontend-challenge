import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-[#6091c3]" />
      <p className="text-sm text-muted-foreground tracking-wide">Loading</p>
    </div>
  );
};
