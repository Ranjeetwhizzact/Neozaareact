import { Suspense } from "react";
import CustomSlider from "./CustomSlider";

export default function BundlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomSlider />
    </Suspense>
  );
}
