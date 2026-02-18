import { AlertCircle } from "lucide-react";

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div className="text-center">
        <h2 className="font-semibold text-foreground">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please try again later.
        </p>
      </div>
    </div>
  );
};
