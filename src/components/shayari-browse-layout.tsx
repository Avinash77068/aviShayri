import type { ReactNode } from "react";
import { CategorySidebar } from "@/components/category-sidebar";
import { cn } from "@/lib/utils";
import { getCategories } from "@/lib/server-data";

export async function ShayariBrowseLayout({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  const categories = await getCategories();
  return (
    <div className={`mx-auto  w-full px-4 pb-16`}>
      <div
        className={cn(
          "grid items-start gap-5",
          home ? "xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-8" : "lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8",
        )}
      >
        <CategorySidebar home={home} initialCategories={categories} />
        <div className="min-w-0 ">{children}</div>
      </div>
    </div>
  );
}
