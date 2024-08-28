"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useCreateuser } from "@/app/api/MyUserApi";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(4, "name is required"),
  email: z
    .string()
    .min(5, "email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z.string().min(5, "email is required"),
  role: z.boolean(),
});
export type UserFormData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: false,
    },
  });

  const OnSubmit = async (data: UserFormData) => {
    try {
      const result = await useCreateuser(data);

      if (result) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="flex items-center justify-center mt-2">
          <div className="w-96 border rounded bg-white px-7 py-10 shadow-2xl">
            <h4 className="text-2xl mb-7">SignUp</h4>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  {form.formState.errors.name && (
                    <span className="text-red-500">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  {form.formState.errors.email && (
                    <span className="text-red-500">
                      {form.formState.errors.email.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" type="password" />
                  </FormControl>
                  {form.formState.errors.password && (
                    <span className="text-red-500">
                      {form.formState.errors.password.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <div className="py-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="admin"
                        checked={field.value === true}
                        onClick={() =>
                          field.onChange(field.value === true ? false : true)
                        }
                      />
                      <label
                        htmlFor="admin"
                        className="text-sm font-medium leading-none"
                      >
                        Admin
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id="team-member"
                        checked={field.value === false}
                        onClick={() =>
                          field.onChange(field.value === false ? true : false)
                        }
                      />
                      <label
                        htmlFor="team-member"
                        className="text-sm font-medium leading-none"
                      >
                        Team member
                      </label>
                    </div>
                    {form.formState.errors.role && (
                      <span className="text-red-500">
                        {form.formState.errors.role.message}
                      </span>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="btn-primary mt-4">
              Signup
            </Button>
            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <Link href="/login" className="text-indigo-800 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Page;
