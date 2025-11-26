"use client";
import Container from "@/app/_components/Container";
import Form from "@/app/_components/Form";
import Button from "@/app/_components/Button";
import useMutate from "@/app/_hooks/useMutate";
import Spinner from "@/app/_components/Spinner";
import { useAuthStore } from "@/app/_stores/authStore";
import { ResetPasswordInput } from "@/app/_schemas/auth";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const [reset, loading, message] = useMutate(resetPassword);
  const router = useRouter();
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    const form = e.currentTarget;
    e.preventDefault();
    // Get form values
    const data = Object.fromEntries(new FormData(form)) as ResetPasswordInput;
    // Login
    await reset(
      {
        data,
        onSuccess: () => {
          // Reset form
          form.reset();
          // Redirect to login
          router.push("/login");
        },
      },
      token
    );
  };

  return (
    <Container className="py-12 flex flex-1 flex-col h-full">
      <Container.Row>
        <Container.Row.Column>
          <div className="w-full max-w-[450px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-medium">
                Reset password
              </h2>
              <p className="mt-2">Enter a new password</p>
            </div>
            <Form onSubmit={handleResetPassword} message={message}>
              <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <Form.Input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm password"
                required
              />
              <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner /> : "Reset password"}
              </Button>
            </Form>
          </div>
        </Container.Row.Column>
      </Container.Row>
    </Container>
  );
}
