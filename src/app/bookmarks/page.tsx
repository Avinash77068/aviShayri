import type { Metadata } from "next";
import { BookmarksView } from "@/components/bookmarks-view";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";

export const metadata: Metadata = {
  title: "Bookmarks",
  robots: { index: false, follow: false },
};

export default function BookmarksPage() {
  return (
    <ShayariBrowseLayout>
      <BookmarksView />
    </ShayariBrowseLayout>
  );
}
