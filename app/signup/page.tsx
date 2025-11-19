"use client";
import Link from "next/link";
import Button from "../_components/Button";
import Container from "../_components/Container";
import Form from "../_components/Form";
import useMutate from "../_hooks/useMutate";
import Spinner from "../_components/Spinner";
import { useAuthStore } from "../_stores/authStore";
import { SignupInput } from "../_schemas/auth";
import { useRouter } from "next/navigation";

function Signup() {
  const { signupUser } = useAuthStore();
  const [signup, loading, message] = useMutate(signupUser);
  const router = useRouter();
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    const form = e.currentTarget;
    e.preventDefault();
    // Get form values
    const data = Object.fromEntries(new FormData(form)) as SignupInput;
    // Login
    await signup({
      data,
      onSuccess: () => {
        // Reset form
        form.reset();
        // Redirect to home
        router.push("/");
      },
    });
  };
  return (
    <Container className="py-12 flex flex-1 flex-col h-full">
      <Container.Row>
        <Container.Row.Column>
          <div className="w-full max-w-[450px] mx-auto">
            <h2 className="text-3xl sm:text-4xl text-center font-medium mb-8">
              Create account
            </h2>
            <Form message={message} onSubmit={handleSignup}>
              <Form.Input
                type="text"
                name="firstName"
                placeholder="First name"
                required
              />
              <Form.Input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <Form.Input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner /> : "Sign up"}
              </Button>
              <Link href="/login" className="inline-block text-center">
                <span className="link--underline">Back to login</span>
              </Link>
            </Form>
          </div>
        </Container.Row.Column>
      </Container.Row>
    </Container>
  );
}

export default Signup;
