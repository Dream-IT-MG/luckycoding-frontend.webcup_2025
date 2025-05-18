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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const videoMediaSchema = z.object({
  videoUrl: z.string().url({ message: "Please enter a valid video URL" }),
});

type VideoMediaInputForm = z.infer<typeof videoMediaSchema>;

interface VideoMediaInputProps {
  onSubmit: (src: string) => void;
  value?: string;
}

const VideoMediaInput: React.FC<VideoMediaInputProps> = ({
  onSubmit,
  value = "",
}) => {
  const form = useForm<VideoMediaInputForm>({
    resolver: zodResolver(videoMediaSchema),
    defaultValues: {
      videoUrl: value,
    },
  });

  useEffect(() => {
    if (value) {
      form.setValue("videoUrl", value);
    }
  }, [value, form]);

  const handleSubmit = (data: VideoMediaInputForm) => {
    onSubmit(data.videoUrl.trim());
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>🎞️ Video URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a valid video URL (e.g., https://example.com/video.mp4)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Video
        </Button>
      </form>
    </Form>
  );
};

export default VideoMediaInput;
