import type { Metadata } from "next";
import { BookmarksView } from "@/components/bookmarks-view";

export const metadata: Metadata = {
  title: "Bookmarks",
  robots: { index: false, follow: false },
};

export default function BookmarksPage() {
  return <BookmarksView />;
}
