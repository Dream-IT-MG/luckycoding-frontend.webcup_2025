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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const narrationFormSchema = z.object({
  narration: z.string().min(2).max(50),
  voice_tone: z.string(),
});

export type NarationFormProps = {
  onNarrationSubmitForm: (data: z.infer<typeof narrationFormSchema>) => void;
  narrationText?: string;
  narrationVoiceTone?: string;
};

export default function NarationForm({
  onNarrationSubmitForm,
  narrationText = "",
  narrationVoiceTone = "",
}: NarationFormProps) {
  const form = useForm<z.infer<typeof narrationFormSchema>>({
    resolver: zodResolver(narrationFormSchema),
    defaultValues: {
      narration: narrationText,
      voice_tone: narrationVoiceTone,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onNarrationSubmitForm)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="voice_tone"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start space-y-3">
              <FormLabel>🔊 Voice tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="ironic">Ironic</SelectItem>
                  <SelectItem value="ultra-cringe">Ultra cringe</SelectItem>
                  <SelectItem value="classy">Classy</SelectItem>
                  <SelectItem value="touching">Touching</SelectItem>
                  <SelectItem value="absurd">Absurd</SelectItem>
                  <SelectItem value="passive-aggressive">
                    Passive-Aggressive
                  </SelectItem>
                  <SelectItem value="honest">Honest</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="narration"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start space-y-3">
              <FormLabel>👄 Narration Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a more on what you feels..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Confirm new narration
        </Button>
      </form>
    </Form>
  );
}
