"use client";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import { useState } from "react";
import { BsEnvelope, BsPhone, BsWhatsapp, BsClock } from "react-icons/bs";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement contact form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">Contact Us</h1>
        <p className="text-[#3b3b3b] max-w-2xl">
          Have questions about our products or services? We're here to help.
          Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px]">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-medium mb-6">Contact Information</h2>

          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="flex items-start gap-4 pb-6 border-b border-grey">
              <div className="shrink-0">
                <BsWhatsapp className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-medium mb-1">WhatsApp</h3>
                <p className="text-[#3b3b3b] text-sm mb-2">
                  Chat with us directly
                </p>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#453121] hover:underline text-sm"
                >
                  +234 800 000 0000
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 pb-6 border-b border-grey">
              <div className="shrink-0">
                <BsPhone size={24} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-[#3b3b3b] text-sm mb-2">
                  Call us during business hours
                </p>
                <a
                  href="tel:+2348000000000"
                  className="text-[#453121] hover:underline text-sm"
                >
                  +234 800 000 0000
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 pb-6 border-b border-grey">
              <div className="shrink-0">
                <BsEnvelope size={24} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-[#3b3b3b] text-sm mb-2">
                  Send us an email anytime
                </p>
                <a
                  href="mailto:contact@nnadiluxurynative.com"
                  className="text-[#453121] hover:underline text-sm"
                >
                  contact@nnadiluxurynative.com
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4 pb-6 border-b border-grey">
              <div className="shrink-0">
                <BsClock size={24} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Business Hours</h3>
                <p className="text-[#3b3b3b] text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-[#3b3b3b] text-sm">
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-[#3b3b3b] text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Visit Us */}
            <div className="pt-2">
              <h3 className="font-medium mb-2">Visit Our Store</h3>
              <p className="text-[#3b3b3b] text-sm mb-4">
                We operate by appointment only to ensure personalized attention.
                Please contact us to schedule your visit.
              </p>
              <p className="text-sm">123 Luxury Avenue, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-medium mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 h-11 border border-grey focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 h-11 border border-grey focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 h-11 border border-grey focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 h-11 border border-grey focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212] resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default ContactPage;
