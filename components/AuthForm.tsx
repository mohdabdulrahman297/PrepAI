"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./FormField";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
        console.log("SIGN UP", values);
      } else {
        toast.success("Signed in successfully.");
        router.push("/");
        console.log("SIGN IN", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`there was an error ${error}`);
    }
    console.log(values);
  }

  const isSignIn = type === "sign-in";
  const isSignUp = type === "sign-up";

  return (
    <div className="border-gradient p-0.5 rounded-2xl w-fit lg:min-w-[566px]">
      <div className="flex flex-col gap-6 dark-gradient rounded-2xl min-h-full py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-lg font-bold ">LevelPrep</h2>
        </div>

        <h3 className="text-2xl font-bold text-center">Welcome to LevelPrep</h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mt-4 form"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your email address"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Ener your password"
            type="password"
          />

          <Button
            type="submit"
            className="w-full py-5 rounded-md bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 text-white font-semibold transition"
          >
            {isSignIn ? "Sign In" : "Create an Account"}
          </Button>
        </form>
      </Form>

      <p className="text-center mt-3">
        {isSignIn ? "Already have an account?" : "No account yet?"}{" "}
        <Link
          className="font-bold text-user-primary"
          href={!isSignIn ? "/sign-in" : "/sign-up"}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
