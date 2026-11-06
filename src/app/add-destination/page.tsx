"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import React from "react";
import { toast } from "react-toastify";
import { getTokenClient } from "@/lib/getTokenClient";

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

export interface PackageFormState {
  name: string;
  country: string;
  category: string | null;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const EMPTY_FORM: PackageFormState = {
  name: "",
  country: "",
  category: null,
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const fieldClass =
  "h-10 rounded-lg border-transparent bg-muted/60 focus-visible:bg-background";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-2">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = React.useState<PackageFormState>(EMPTY_FORM);

  function update(patch: Partial<PackageFormState>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getTokenClient();

    console.log("token", token);

    const res = await fetch("https://wanderlust-server-mu-ruddy.vercel.app/add-destination", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();

    console.log("Add Travel Package payload:", result);

    if (res.ok) {
      toast.success("Travel package added successfully!");
      setForm(EMPTY_FORM)
    } else {
      toast.error(result?.message || "Failed to add travel package");
    }
  };

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Add New Travel Package
        </h1>
        <div className="mt-10 sm:mt-16">
          <Card className="mx-auto w-full max-w-2xl rounded-lg py-6 shadow-sm sm:py-8">
            <CardContent className="px-5 sm:px-8">
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <Field label="Destination Name" htmlFor="destination-name">
                  <Input
                    id="destination-name"
                    name="destinationName"
                    placeholder="Bali Paradise"
                    required
                    className={fieldClass}
                    value={form.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-7">
                  <Field label="Country" htmlFor="country">
                    <Input
                      id="country"
                      name="country"
                      placeholder="Indonesia"
                      required
                      className={fieldClass}
                      value={form.country}
                      onChange={(e) => update({ country: e.target.value })}
                    />
                  </Field>

                  <Field label="Category" htmlFor="category">
                    <Select
                      value={form.category}
                      onValueChange={(value) => update({ category: value })}
                    >
                      <SelectTrigger
                        id="category"
                        className={`${fieldClass} w-full justify-between`}
                      >
                        <SelectValue placeholder="Beach" />
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

                  <Field label="Price (USD)" htmlFor="price">
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g., 1299"
                      required
                      className={fieldClass}
                      value={form.price}
                      onChange={(e) => update({ price: e.target.value })}
                    />
                  </Field>

                  <Field label="Duration" htmlFor="duration">
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g., 7 Days/6 Nights"
                      required
                      className={fieldClass}
                      value={form.duration}
                      onChange={(e) => update({ duration: e.target.value })}
                    />
                  </Field>
                </div>

                <Field label="Departure Date" htmlFor="departure-date">
                  <Input
                    id="departure-date"
                    name="departureDate"
                    type="date"
                    required
                    className={fieldClass}
                    value={form.departureDate}
                    onChange={(e) => update({ departureDate: e.target.value })}
                  />
                </Field>

                <Field label="Image URL" htmlFor="image-url">
                  <Input
                    id="image-url"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className={fieldClass}
                    value={form.imageUrl}
                    onChange={(e) => update({ imageUrl: e.target.value })}
                  />
                </Field>

                <Field label="Description" htmlFor="description">
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the travel experience..."
                    className="rounded-lg border-transparent bg-muted/60 focus-visible:bg-background"
                    value={form.description}
                    onChange={(e) => update({ description: e.target.value })}
                  />
                </Field>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-md border-red-300 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      toast.info("Form cleared");
                    }}
                  >
                    <Trash2 className="size-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 rounded-md bg-[#14b8b0] px-5 text-white shadow-none hover:bg-[#0fa39c]"
                  >
                    <Plus className="size-4" />
                    Add Travel Package
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
