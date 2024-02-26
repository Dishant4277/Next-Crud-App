import Posts from "./post/page";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts />
    </Suspense>
  );
}
