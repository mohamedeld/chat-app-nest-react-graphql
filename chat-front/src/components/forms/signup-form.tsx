import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupFormValues, signupSchema } from "@/schema/signup.schema";
import { useCreateUser } from "@/hooks/use-create-user";
import { toast } from "../ui/toast";

export function SignupForm() {
  const navigate = useNavigate();
  const [createUser] = useCreateUser();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const { email, password } = data;
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            password,
          },
        },
      });
      toast.add({
        title: "User Registered",
        description: "User Registered Successfully",
      });
      navigate("/login");
    } catch (error) {
      toast.add({
        title: "Error",
        description: `Signup error: ${error}`,
      });
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>

          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      className="pl-9"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter your password"
                      className="pl-9"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-9"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Creating account...</span>
                  <span className="animate-spin">⏳</span>
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          {/* Login */}
          <div className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="text-sm p-0 h-auto font-medium"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </div>

          {/* Divider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" type="button">
              Google
            </Button>

            <Button variant="outline" className="flex-1" type="button">
              GitHub
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
