import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import loginUser from "@/api/loginApi";

import axios from "axios";
import UseUser from "@/hooks/use-user";

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^(\+977)?[9][8][4-6|0-2]\d{7}$/;

export function Login() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [firstField, setFirstField] = useState<"email" | "mobile_no">("email");
  const [secondField, setSecondField] = useState<"pin" | "password">(
    "password"
  );

  const { setToken } = UseUser();

  const formSchema = z.object({
    email_phone: z.string().refine(
      (value) => {
        if (emailRegex.test(value)) {
          setFirstField("email");
          return true;
        } else if (phoneRegex.test(value)) {
          setFirstField("mobile_no");
          return true;
        } else {
          return false;
        }
      },
      {
        message: "Please enter a valid email or phone number",
      }
    ),
    password_pin: z.string().refine(
      (value) => {
        if (value.length === 4) {
          setSecondField("pin");
          return true;
        } else if (value.length >= 6) {
          setSecondField("password");
          return true;
        } else {
          setSecondField("password");
          return true;
        }
      },
      {
        message: "Please enter 4 digit pin or password greater than 6 digit",
      }
    ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_phone: "",
      password_pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const data = await loginUser(
        firstField,
        secondField,
        values.email_phone,
        values.password_pin
      );

      if (data.access_token) {
        toast.success("Successfully Logged in");
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
        return;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const error = err.response?.data;
        if (error && error.message) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred while logging in.");
        }
      } else {
        toast.error("An unexpected error occurred while logging in.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email or phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password or Pin</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password_pin"
                          placeholder="Enter password or pin number"
                          type={`${togglePassword ? "text" : "password"}`}
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          className="absolute right-0 top-0"
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => setTogglePassword(!togglePassword)}
                        >
                          {togglePassword ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Loading.." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
