import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FuelType } from "@/types";

const EditFuelTypeSchema = z.object({
  name: z.string().min(3, "Fuel name must be at least 3 characters."),
  is_available: z.boolean(),
});

type EditFuelTypeFormValues = z.infer<typeof EditFuelTypeSchema>;

interface EditFuelTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fuelType: FuelType;
  onFuelTypeUpdated: (updatedFuelType: FuelType) => void;
}

const EditFuelTypeModal: React.FC<EditFuelTypeModalProps> = ({
  isOpen,
  onClose,
  fuelType,
  onFuelTypeUpdated,
}) => {
  const form = useForm<EditFuelTypeFormValues>({
    resolver: zodResolver(EditFuelTypeSchema),
    defaultValues: {
      name: fuelType.name,
      is_available: fuelType.is_available,
    },
  });

  useEffect(() => {
    if (fuelType) {
      form.reset({
        name: fuelType.name,
        is_available: fuelType.is_available,
      });
    }
  }, [fuelType, form, isOpen]);

  const onSubmit = (values: EditFuelTypeFormValues) => {
    const updatedFuelType: FuelType = {
      ...fuelType,
      name: values.name,
      is_available: values.is_available,
      updated_at: new Date().toISOString(),
    };
    onFuelTypeUpdated(updatedFuelType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Fuel Type: {fuelType.name}</DialogTitle>
          <DialogDescription>
            Update the name and availability of this fuel type.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Diesel Plus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Available for Ordering</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFuelTypeModal;
