"use client";

import { trackCustomEvent } from "@/lib/pixel";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  stepNumber: number;
  routineId: string;
}

export default function ProductCard({
  product,
  stepNumber,
  routineId,
}: ProductCardProps) {
  const handleClick = () => {
    trackCustomEvent("ProductClick", {
      product_name: product.name,
      product_brand: product.brand,
      product_step: product.step,
      routine_id: routineId,
      product_price: product.price,
    });
  };

  const stepColors: Record<string, string> = {
    Cleanser: "bg-sage-light text-sage",
    Treatment: "bg-primary-light text-primary-dark",
    Serum: "bg-accent-light text-accent",
    Exfoliant: "bg-primary-light text-primary-dark",
    Moisturizer: "bg-sage-light text-sage",
    SPF: "bg-accent-light text-accent",
    "Eye Cream": "bg-primary-light text-primary-dark",
  };

  const colorClass = stepColors[product.step] ?? "bg-border text-muted";

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-muted/60 uppercase tracking-wider">
                Step {stepNumber}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}
              >
                {product.step}
              </span>
            </div>
            <h3 className="font-bold text-lg text-foreground leading-snug">
              {product.name}
            </h3>
            <p className="text-sm text-muted mt-0.5">{product.brand}</p>
          </div>
          <span className="text-lg font-bold text-primary flex-shrink-0">
            {product.price}
          </span>
        </div>

        <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
          {product.whyThisProduct}
        </p>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
        >
          Shop Now
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
