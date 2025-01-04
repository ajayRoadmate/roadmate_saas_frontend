import { Suspense } from 'react';
import ManageOrderDetails from "@/components/Frontend/Pages/ManageOrderDetails/ManageOrderDetails";


export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageOrderDetails />
    </Suspense>
  );
}
