import { Suspense } from 'react';
import ViewProductDetails from "@/components/Frontend/Pages/ViewProductDetails/ViewProductDetails";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewProductDetails />
    </Suspense>
  );
}
