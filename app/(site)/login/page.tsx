"use client";
import Link from "next/link";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Form from "@/app/_components/Form";
import Spinner from "@/app/_components/Spinner";
import useMutate from "@/app/_hooks/useMutate";
import { LoginInput } from "@/app/_schemas/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_stores/authStore";

export default function Login() {
  const { loginUser } = useAuthStore();
  const [login, loading, message] = useMutate(loginUser);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    const form = e.currentTarget;
    e.preventDefault();
    // Get form values
    const data = Object.fromEntries(new FormData(form)) as LoginInput;
    // Login
    await login({
      data,
      onSuccess: async () => {
        // Reset form
        form.reset();

        router.push("/account");
      },
    });
  };

  return (
    <Container className="py-12 flex flex-1 flex-col h-full">
      <Container.Row>
        <Container.Row.Column>
          <div className="w-full max-w-[450px] mx-auto">
            <h2 className="text-3xl sm:text-4xl text-center font-medium mb-8">
              Login
            </h2>
            <Form onSubmit={handleLogin} message={message}>
              <Form.Input
                type="email"
                placeholder="Email"
                name="email"
                required
              />
              <div>
                <Form.Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <Link href="/forgot-password" className="mt-3 inline-block">
                  <span className="link--underline">Forgot your password</span>
                </Link>
              </div>
              <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner /> : "Sign in"}
              </Button>
              <Link href="/signup" className="inline-block text-center">
                <span className="link--underline">Create account</span>
              </Link>
            </Form>
          </div>
        </Container.Row.Column>
      </Container.Row>
    </Container>
  );
}
