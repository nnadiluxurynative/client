"use client";
import Accordion from "@/app/_components/Accordion";
import Container from "@/app/_components/Container";
import Link from "next/link";

const faqs = [
  {
    question: "How long does it take to complete a custom order?",
    answer:
      "Our standard delivery time is 2-3 weeks from the date of measurement confirmation. Rush orders can be accommodated for an additional fee.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. International shipping costs vary by location and are calculated at checkout. Express shipping options are available.",
  },
  {
    question: "What is your alteration policy?",
    answer:
      "We offer complimentary minor alterations within 30 days of delivery. Major alterations may incur additional charges. Please contact us for details.",
  },
  {
    question: "Can I visit your atelier without an appointment?",
    answer:
      "We operate by appointment only to ensure personalized attention. Please contact us via WhatsApp or phone to schedule your visit.",
  },
  {
    question: "What materials do you use for your garments?",
    answer:
      "We source premium fabrics from renowned mills around the world, including Italy, France, and Japan. Our materials are selected for their quality, durability, and comfort.",
  },
  {
    question: "Do you offer virtual consultations?",
    answer:
      "Yes, we provide virtual consultations via video call to discuss your requirements and guide you through the customization process.",
  },
];

export default function FAQsPage() {
  return (
    <Container className="py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center sm:text-4xl font-medium mb-8">
        Frequently Asked Questions
      </h1>
      <Accordion>
        {faqs.map((item, idx) => (
          <Accordion.Item key={idx} item={item} idx={idx} />
        ))}
      </Accordion>
      <div className="mt-10 gap-2 text-center flex items-center justify-center">
        <p className="font-medium">Have more questions?</p>
        <Link href="/contact" className="link--underline">
          Get in touch
        </Link>
      </div>
    </Container>
  );
}
