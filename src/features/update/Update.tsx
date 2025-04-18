import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useUpdate } from "./useUpdate";
import { Car } from "@/types/car";

export const Update = ({ car }: { car: Car }) => {
  const { formData, handleChange, handleSubmit, isFormValid } = useUpdate(car);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Edit">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Item</DialogTitle>
          </DialogHeader>
          <form
            name="update"
            aria-label="Update"
            onSubmit={(e) => handleSubmit(e, car.id)}
            className="w-full max-w-lg mx-auto"
          >
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  required
                  placeholder="Enter model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  name="year"
                  required
                  placeholder="Enter year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  required
                  placeholder="Enter price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  step={0.01}
                />
              </div>
              <div>
                <Label htmlFor="engine">Engine Type</Label>
                <Select
                  name="engine"
                  defaultValue={formData.engine}
                  required
                  value={formData.engine}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "engine", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <SelectTrigger id="engine" className="w-full">
                    <SelectValue placeholder="Select Engine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.0L TSI">1.0L TSI</SelectItem>
                    <SelectItem value="1.5L TSI">1.5L TSI</SelectItem>
                    <SelectItem value="2.0L TSI">2.0L TSI</SelectItem>
                    <SelectItem value="2.0L TDI">2.0L TDI</SelectItem>
                    <SelectItem value="1.6L TDI">1.6L TDI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  name="transmission"
                  defaultValue={formData.transmission}
                  required
                  value={formData.transmission}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "transmission", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <SelectTrigger id="transmission" className="w-full">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Single-speed">Single-speed</SelectItem>
                    <SelectItem value="Auutomatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" disabled={!isFormValid()}>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
