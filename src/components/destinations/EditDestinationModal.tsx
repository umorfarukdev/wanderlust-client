"use client";

import IDestination from "@/type/destinationsType";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ban, Pencil, Save } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { getTokenClient } from "@/lib/getTokenClient";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Cruise",
  "Wildlife",
  "Honeymoon",
] as const;

const fieldClass =
  "h-10 rounded-lg border-input bg-muted/60 focus-visible:bg-background";

const EditDestinationModal = ({
  destination,
}: {
  destination: IDestination;
}) => {
  const router = useRouter()
  const [form, setForm] = React.useState<IDestination>(destination);

  console.log(destination);
  const [loading, setLoading] = React.useState(false);

  function update(patch: Partial<IDestination>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const token = await getTokenClient();

    const updatedData = {
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      category: form.category,
      price: Number(formData.get("price")),
      duration: formData.get("duration") as string,
      departureDate: formData.get("departureDate") as string,
      imageUrl: formData.get("imageUrl") as string,
      description: formData.get("description") as string,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      },
    );
    const data = await res.json();

    console.log("Add Travel Package payload:", data);

    if (res.ok) {
      toast.success("Travel package updated successfully!");
      router.push(`/destinations/${destination._id}`)
    } else {
      toast.error(data?.message || "Failed to update travel package");
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            // onClick={resetForm}
            className="flex h-9 items-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4">
            <Field>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="Bali Paradise"
                required
                className={fieldClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  name="country"
                  value={form.country}
                  onChange={(e) => update({ country: e.target.value })}
                  placeholder="Indonesia"
                  required
                  className={fieldClass}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    update({
                      category: value as IDestination["category"],
                    })
                  }
                >
                  <SelectTrigger
                    id="edit-category"
                    className={`${fieldClass} w-full justify-between`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-price">Price (USD)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) =>
                    update({
                      price:
                        e.target.value === ""
                          ? ("" as unknown as number)
                          : Number(e.target.value),
                    })
                  }
                  placeholder="e.g., 1299"
                  required
                  className={fieldClass}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  value={form.duration}
                  onChange={(e) => update({ duration: e.target.value })}
                  placeholder="e.g., 7 Days/6 Nights"
                  required
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="edit-departure-date">Departure Date</Label>
              <Input
                id="edit-departure-date"
                name="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(e) => update({ departureDate: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-image-url">Image URL</Label>
              <Input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(e) => update({ imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className={fieldClass}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={4}
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="Describe the travel experience..."
                className="rounded-lg border-input bg-muted/60 focus-visible:bg-background"
              />
            </Field>
          </FieldGroup>

          <div className="mt-5 flex justify-end gap-3">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-md border-red-300 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Ban className="size-4" />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={loading}
              className="flex h-10 items-center gap-2 rounded-md bg-[#14b8b0] px-5 text-sm font-medium text-white shadow-none hover:bg-[#0fa39c]"
            >
              <Save className="size-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    // <Dialog>
    //   <DialogTrigger
    //     render={
    //       <Button className="flex h-9 items-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-medium text-foreground hover:bg-muted">
    //         <Pencil className="size-3.5" />
    //         Edit
    //       </Button>
    //     }
    //   />
    //   <DialogContent className="sm:max-w-xl">
    //     <DialogHeader>
    //       <DialogTitle className="text-lg">Update Travel Package</DialogTitle>
    //       <DialogDescription>
    //         Make changes to the travel package details below
    //       </DialogDescription>
    //     </DialogHeader>

    //     <form onSubmit={handleSubmit}>
    //       <FieldGroup className="gap-4">
    //         <Field>
    //           <Label htmlFor="edit-name">Name</Label>
    //           <Input
    //             id="edit-name"
    //             name="name"
    //             defaultValue={destination.name}
    //             placeholder="Bali Paradise"
    //             required
    //             className={fieldClass}
    //           />
    //         </Field>

    //         <div className="grid gap-4 sm:grid-cols-2">
    //           <Field>
    //             <Label htmlFor="edit-country">Country</Label>
    //             <Input
    //               id="edit-country"
    //               name="country"
    //               defaultValue={destination.country}
    //               placeholder="Indonesia"
    //               required
    //               className={fieldClass}
    //             />
    //           </Field>

    //           <Field>
    //             <Label htmlFor="edit-category">Category</Label>
    //             <Select
    //               value={form.category}
    //               onValueChange={(value) => update({ category: value })}
    //             >
    //               <SelectTrigger
    //                 id="category"
    //                 className={`${fieldClass} w-full justify-between`}
    //               >
    //                 <SelectValue placeholder="Beach" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 {CATEGORIES.map((category) => (
    //                   <SelectItem key={category} value={category}>
    //                     {category}
    //                   </SelectItem>
    //                 ))}
    //               </SelectContent>
    //             </Select>
    //           </Field>
    //         </div>

    //         <div className="grid gap-4 sm:grid-cols-2">
    //           <Field>
    //             <Label htmlFor="edit-price">Price (USD)</Label>
    //             <Input
    //               id="edit-price"
    //               name="price"
    //               type="number"
    //               min="0"
    //               step="1"
    //               defaultValue={destination.price}
    //               placeholder="e.g., 1299"
    //               required
    //               className={fieldClass}
    //             />
    //           </Field>

    //           <Field>
    //             <Label htmlFor="edit-duration">Duration</Label>
    //             <Input
    //               id="edit-duration"
    //               name="duration"
    //               defaultValue={destination.duration}
    //               placeholder="e.g., 7 Days/6 Nights"
    //               required
    //               className={fieldClass}
    //             />
    //           </Field>
    //         </div>

    //         <Field>
    //           <Label htmlFor="edit-departure-date">Departure Date</Label>
    //           <Input
    //             id="edit-departure-date"
    //             name="departureDate"
    //             type="date"
    //             defaultValue={destination.departureDate}
    //             required
    //             className={fieldClass}
    //           />
    //         </Field>

    //         <Field>
    //           <Label htmlFor="edit-image-url">Image URL</Label>
    //           <Input
    //             id="edit-image-url"
    //             name="imageUrl"
    //             type="url"
    //             defaultValue={destination.imageUrl}
    //             placeholder="https://example.com/image.jpg"
    //             className={fieldClass}
    //           />
    //         </Field>

    //         <Field>
    //           <Label htmlFor="edit-description">Description</Label>
    //           <Textarea
    //             id="edit-description"
    //             name="description"
    //             rows={4}
    //             defaultValue={destination.description}
    //             placeholder="Describe the travel experience..."
    //             className="rounded-lg border-input bg-muted/60 focus-visible:bg-background"
    //           />
    //         </Field>
    //       </FieldGroup>

    //       <div className="mt-5 flex justify-end gap-3">
    //         <DialogClose
    //           render={
    //             <Button
    //               type="button"
    //               variant="outline"
    //               className="h-10 rounded-md border-red-300 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
    //             >
    //               <Ban className="size-4" />
    //               Cancel
    //             </Button>
    //           }
    //         />
    //         <Button
    //           type="submit"
    //           className="flex h-10 items-center gap-2 rounded-md bg-[#14b8b0] px-5 text-sm font-medium text-white shadow-none hover:bg-[#0fa39c]"
    //         >
    //           <Save className="size-4" />
    //           Save Changes
    //         </Button>
    //       </div>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  );
};

export default EditDestinationModal;
