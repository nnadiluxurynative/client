"use client";
import Link from "next/link";
import Container from "@/app/_components/Container";
import Form from "@/app/_components/Form";
import Button from "@/app/_components/Button";
import useMutate from "@/app/_hooks/useMutate";
import Spinner from "@/app/_components/Spinner";
import { useAuthStore } from "@/app/_stores/authStore";
import { ForgotPasswordInput } from "@/app/_schemas/auth";

export default function ForgotPassword() {
  const { forgotPassword } = useAuthStore();
  const [forgot, loading, message, setMessage] = useMutate(forgotPassword);
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    const form = e.currentTarget;
    e.preventDefault();
    // Get form values
    const data = Object.fromEntries(new FormData(form)) as ForgotPasswordInput;
    // Login
    await forgot({
      data,
      onSuccess: (message) => {
        // Reset form
        form.reset();
        // Set success message
        setMessage({
          type: "success",
          message: message || "Verification email sent",
        });
      },
    });
  };
  return (
    <Container className="py-12 flex flex-1 flex-col h-full">
      <Container.Row>
        <Container.Row.Column>
          <div className="w-full max-w-[450px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-medium">
                Forgot password
              </h2>
              <p className="mt-2">
                We will send you an email to reset your password
              </p>
            </div>
            <Form message={message} onSubmit={handleForgotPassword}>
              <Form.Input
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner /> : "Submit"}
              </Button>
              <Link href="/login" className=" inline-block text-center">
                <span className="link--underline">Back to login</span>
              </Link>
            </Form>
          </div>
        </Container.Row.Column>
      </Container.Row>
    </Container>
  );
}
