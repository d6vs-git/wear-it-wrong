// app/book/page.tsx
import { Suspense } from "react";
import BookPageContent from "./book-page-content";

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
