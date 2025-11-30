"use client";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Form from "@/app/_components/Form";
import Spinner from "@/app/_components/Spinner";
import useMutate from "@/app/_hooks/useMutate";
import API from "@/app/_lib/axios";
import { GenericAPIResponse } from "@/app/_types/api";
import { handleErrorMessage } from "@/app/_utils/helpers";

function ContactPage() {
  const sendEmail = async (data: {
    email: string;
    name: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    try {
      const res = await API.post<GenericAPIResponse<any>>("/contact", data);

      return res.data.message;
    } catch (err: any) {
      const message = handleErrorMessage(err, "Something went wrong");
      throw Error(message);
    }
  };

  const [send, loading, message, setMessage] = useMutate(sendEmail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      name: string;
      phone: string;
      subject: string;
      message: string;
    };

    await send({
      data,
      onSuccess: (message) => {
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
    <div className="py-12">
      <Container className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-center sm:text-4xl font-medium mb-8">
          Get in Touch
        </h1>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Details */}
          <div className="bg-gray-50 rounded-xs p-6 lg:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-1">WhatsApp</h3>
                  <p className="text-sm text-[#3b3b3b] mb-1">
                    Fastest support for quick questions & bespoke requests.
                  </p>
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm link--underline"
                  >
                    +234 706 267 6821
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-1">Phone</h3>
                  <p className="text-sm text-[#3b3b3b] mb-1">
                    Mon–Fri, 9:00–18:00
                  </p>
                  <a
                    href="tel:+2348000000000"
                    className="text-sm link--underline"
                  >
                    +234 706 267 6821
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <p className="text-sm text-[#3b3b3b] mb-1">
                    We aim to reply within 1 business day.
                  </p>
                  <a
                    href="mailto:contact@nnadiluxurynative.com"
                    className="text-sm link--underline"
                  >
                    contact@nnadiluxurynative.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-1">Address</h3>
                  <p className="text-sm text-[#3b3b3b] mb-1">
                    Available by appointment only.
                  </p>
                  <p className="text-sm ">Enugu, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-2xl font-medium mb-6">Send us a Message</h2>
            <Form onSubmit={handleSubmit} message={message}>
              <Form.Input
                type="text"
                placeholder="Full name"
                required
                name="name"
              />
              <Form.Input
                type="email"
                placeholder="Email"
                required
                name="email"
              />
              <Form.Input
                type="text"
                name="phone"
                placeholder="Phone number"
                required
              />
              <Form.Input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <Form.Textarea
                name="message"
                rows={6}
                placeholder="Your message"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="w-full mt-3"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Send message"}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ContactPage;
