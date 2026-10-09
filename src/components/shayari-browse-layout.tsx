import type { ReactNode } from "react";
import { CategorySidebar } from "@/components/category-sidebar";
import { cn } from "@/lib/utils";

export function ShayariBrowseLayout({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  return (
    <div className={`mx-auto  ${home ? "w-full" : "max-w-7xl"} px-4 pb-16`}>
      <div
        className={cn(
          "grid items-start gap-5",
          home ? "xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-8" : "lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8",
        )}
      >
        <CategorySidebar home={home} />
        <div className="min-w-0 ">{children}</div>
      </div>
    </div>
  );
}
