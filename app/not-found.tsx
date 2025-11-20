import Link from "next/link";
import Button from "./_components/Button";
import Container from "./_components/Container";

export default function NotFound() {
  return (
    <div className="py-12 flex items-center justify-center bg-white">
      <Container>
        <div className="text-center">
          <h1 className="text-center text-lg text-[#3b3b3b] font-medium mb-2">
            404
          </h1>
          <h2 className="text-3xl text-center sm:text-4xl font-medium mb-4">
            Page not found
          </h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn’t exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/shop">
              <Button>Continue shopping</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
