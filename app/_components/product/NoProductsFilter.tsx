"use client";
import Button from "@/app/_components/Button";

type Props = {
  title?: string;
  description?: string;
  onReset?: () => void;
};

export default function NoProductsFilter({
  title = "No products found",
  description = "Try adjusting your filters or clear them to see more products.",
  onReset,
}: Props) {
  return (
    <div className="py-12 text-center">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="mb-6 text-[#3b3b3b]">{description}</p>
      <div className="flex justify-center">
        <Button size="md" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}
