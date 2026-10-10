import { getLlmsFullText } from "@/lib/llms-txt";

export const dynamic = "force-static";

export function GET() {
  return new Response(getLlmsFullText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
