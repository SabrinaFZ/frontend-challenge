import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDelete } from "./useDelete";

export const Delete = ({ id }: { id: string }) => {
  const { loading, error, deleteItem } = useDelete();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteItem(id);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
        </DialogHeader>
        <form name="delete" onSubmit={handleSubmit}>
          <p className="text-muted-foreground">
            Are you sure you want to delete this item? with id{" "}
            <strong>{id}</strong>? This action can not be undone.
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
