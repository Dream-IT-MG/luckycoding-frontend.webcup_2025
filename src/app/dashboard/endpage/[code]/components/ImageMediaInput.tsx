"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const imageMediaSchema = z.object({
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
});

type ImageMediaInputForm = z.infer<typeof imageMediaSchema>;

interface ImageMediaInputProps {
  onSubmit: (src: string) => void;
  value?: string;
}

const ImageMediaInput: React.FC<ImageMediaInputProps> = ({
  onSubmit,
  value = "",
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const form = useForm<ImageMediaInputForm>({
    resolver: zodResolver(imageMediaSchema),
    defaultValues: {
      imageUrl: value,
    },
  });

  useEffect(() => {
    if (value) {
      setPreview(value);
      form.setValue("imageUrl", value);
    }
  }, [value, form]);

  const handleSubmit = (data: ImageMediaInputForm) => {
    onSubmit(data.imageUrl.trim());
    form.reset();
    setPreview(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>🖼️ Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a valid image URL (e.g., https://example.com/image.jpg)"
                  {...field}
                  onBlur={(e) => setPreview(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] object-contain rounded-md border"
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={!preview}>
          Upload Image
        </Button>
      </form>
    </Form>
  );
};

export default ImageMediaInput;
