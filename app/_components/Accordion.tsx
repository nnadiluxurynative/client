"use client";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  createContext,
} from "react";
import { BsDash, BsPlus } from "react-icons/bs";

interface AccordionProps {
  className?: string;
  children: React.ReactNode;
}

function AccordionItem({
  item,
  idx,
}: {
  item: { question: string; answer: React.ReactNode };
  idx: number;
}) {
  const { openIndex, toggle } = useAccordionContext();
  const isOpen = openIndex === idx;
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
    <div
      className="border-b border-grey"
      style={{ transition: "all 320ms cubic-bezier(0.4,0,0.2,1)" }}
    >
      <button
        className="w-full text-left py-4 cursor-pointer font-medium text-base flex justify-between items-center focus:outline-none"
        onClick={() => toggle(idx)}
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
        <div ref={contentRef} className="pb-4 text-sm">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

const AccordionContext = createContext(
  {} as {
    openIndex: number | null;
    toggle: (idx: number) => void;
  }
);

export const useAccordionContext = () => {
  if (!AccordionContext) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider"
    );
  }
  return React.useContext(AccordionContext);
};

function Accordion({ children, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((cur) => (cur === idx ? null : idx));
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
