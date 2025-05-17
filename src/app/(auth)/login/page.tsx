"use client"

import { FormEvent, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginRequest } from "../services/auth-service";

const formSchema = z.object({
  email: z.string().min(1, { message: "This field is required." }),
  password: z.string().min(1, { message: "This field is required." }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await userLoginRequest({ email: values.email, password: values.password })
  }

  return (
    <div className="max-w-xl">
      <div className="bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input className="input" type="email" name="" />
        </form>
      </div>
    </div>
  );
}
