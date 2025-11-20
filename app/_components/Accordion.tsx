"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { BsDash, BsPlus } from "react-icons/bs";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

function AccordionItem({
  item,
  isOpen,
  idx,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  idx: number;
  onToggle: (i: number) => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  // measure height when content changes
  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  // update height on window resize
  useEffect(() => {
    const update = () => {
      if (contentRef.current) setHeight(contentRef.current.scrollHeight);
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="border-b border-grey">
      <button
        className="w-full text-left py-4 cursor-pointer font-medium text-lg flex justify-between items-center focus:outline-none"
        onClick={() => onToggle(idx)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${idx}`}
      >
        {item.question}
        <span className="ml-2">
          {isOpen ? <BsDash size={20} /> : <BsPlus size={20} />}
        </span>
      </button>

      <div
        id={`faq-panel-${idx}`}
        role="region"
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          overflow: "hidden",
          transition:
            "max-height 320ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease",
          opacity: isOpen ? 1 : 0,
        }}
        className="text-muted-foreground"
      >
        <div ref={contentRef} className="pb-4">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((cur) => (cur === idx ? null : idx));
  };

  return (
    <div className="">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          item={item}
          idx={idx}
          isOpen={openIndex === idx}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}
