// app/product/page.js  (server component)
import React, { Suspense } from "react";
import ProductPageClient from "./ProductPageClient";

export default function ProductPage() {
  return (
    <Suspense fallback={<h1>Loading product...</h1>}>
      <ProductPageClient />
    </Suspense>
  );
}
