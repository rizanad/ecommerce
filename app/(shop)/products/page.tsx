
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ProductsClient />
    </Suspense>
  );
}