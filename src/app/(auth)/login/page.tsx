"use client"

import { useState, useEffect } from "react";
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

    useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty("--x", `${e.clientX}px`);
      document.body.style.setProperty("--y", `${e.clientY}px`);
      document
        .querySelector(".tracking-gradient")
        ?.classList.add("show-gradient");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document
          .querySelector(".tracking-gradient")
          ?.classList.remove("show-gradient");
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <div 
        className="tracking-gradient max-w-sm w-full">
        <div className="grid gap-4">
          <h1 className="text-center text-white font-semibold text-3xl">Connexion</h1>
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
              <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Se connecter
              </button>
            </form>
          </Form>
        </div>
      </div>
    )
  );
}
