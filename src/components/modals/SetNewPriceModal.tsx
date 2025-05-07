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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FuelPrice } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SetNewPriceSchema = z.object({
  delivery_price_per_liter: z.coerce
    .number()
    .positive("Price must be positive."),
  pickup_price_per_liter: z.coerce.number().positive("Price must be positive."),
  effective_from: z.date({ required_error: "Effective date is required." }),
});

type SetNewPriceFormValues = z.infer<typeof SetNewPriceSchema>;

interface SetNewPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  fuelTypeId: string;
  fuelTypeName: string;
  currentUserId: string;
  onNewPriceSet: (newPrice: FuelPrice) => void;
}

const SetNewPriceModal: React.FC<SetNewPriceModalProps> = ({
  isOpen,
  onClose,
  fuelTypeId,
  fuelTypeName,
  currentUserId,
  onNewPriceSet,
}) => {
  const form = useForm<SetNewPriceFormValues>({
    resolver: zodResolver(SetNewPriceSchema),
    defaultValues: {
      delivery_price_per_liter: undefined,
      pickup_price_per_liter: undefined,
      effective_from: new Date(), // Default to today
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        // Reset form when modal opens
        delivery_price_per_liter: undefined,
        pickup_price_per_liter: undefined,
        effective_from: new Date(),
      });
    }
  }, [isOpen, form]);

  const onSubmit = (values: SetNewPriceFormValues) => {
    const newPriceEntry: FuelPrice = {
      id: `fp_${Date.now()}`,
      fuel_type_id: fuelTypeId,
      delivery_price_per_liter: values.delivery_price_per_liter,
      pickup_price_per_liter: values.pickup_price_per_liter,
      effective_from: values.effective_from.toISOString(),
      set_by_user_id: currentUserId,
      created_at: new Date().toISOString(),
    };
    onNewPriceSet(newPriceEntry);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set New Price for {fuelTypeName}</DialogTitle>
          <DialogDescription>
            Enter the new pricing details and effective date.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="delivery_price_per_liter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Price per Liter (PHP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 70.50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickup_price_per_liter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Price per Liter (PHP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 69.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="effective_from"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Effective From</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        } // Disable past dates
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date this new price will become active.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Set Price</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SetNewPriceModal;
