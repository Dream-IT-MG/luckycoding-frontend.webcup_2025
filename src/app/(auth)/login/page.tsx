"use client"

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginRequest } from "../services/auth-service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.string().min(1, { message: "This field is required." }),
  password: z.string().min(1, { message: "This field is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    const response = await userLoginRequest({
      email: values.email,
      password: values.password
    });

    if (response.status === "success") {
      router.push("dashboard");
    } else {
      toast.error(response.message ?? "Please try again later");
      setIsLoading(false)
    }
  }

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <div className="max-w-sm w-full">
        <div className="grid gap-4">
          <h1 className="text-center font-semibold text-3xl">Connexion</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="input shadow-dimension w-full" type="email" placeholder="Adresse e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="input shadow-dimension w-full" type="password" placeholder="Mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="w-full bg-primary text-white rounded py-2 shadow-dimension animation" type="submit">
                Se connecter
              </button>
            </form>
          </Form>
        </div>
      </div>
    )
  );
}
