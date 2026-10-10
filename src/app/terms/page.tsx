import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Feather, ScrollText } from "lucide-react";
import { breadcrumbJsonLd, pageSocialMetadata, serializeJsonLd } from "@/lib/seo";

const description =
  "Read the terms that apply when you browse Shayari, create an account, or share your poetry with the community.";
const breadcrumbData = {
  "@context": "https://schema.org",
  ...breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ])!,
};

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: "/terms" },
  ...pageSocialMetadata({ title: "Terms of Service", description, path: "/terms" }),
};

const sections = [
  { id: "agreement", label: "Agreement" },
  { id: "the-service", label: "The service" },
  { id: "accounts", label: "Your account" },
  { id: "your-submissions", label: "Your submissions" },
  { id: "community-rules", label: "Community rules" },
  { id: "moderation", label: "Review and moderation" },
  { id: "rights", label: "Content and ownership" },
  { id: "availability", label: "Availability and links" },
  { id: "liability", label: "Disclaimers and liability" },
  { id: "changes", label: "Changes and termination" },
];

const headingClass = "text-xl font-bold tracking-tight sm:text-2xl";
const paragraphClass = "mt-3 leading-7 text-[var(--muted)]";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span aria-current="page" className="text-[var(--foreground)]">Terms of Service</span>
      </nav>

      <header className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-6 py-9 shadow-sm sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
            The essentials
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            These terms explain the rules for using Shayari, including reading,
            saving, and sharing poetry or submitting your own work.
          </p>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Last updated: <time dateTime="2026-10-10">October 10, 2026</time>
          </p>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-36">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            On this page
          </p>
          <nav aria-label="Terms sections">
            <ol className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-start gap-2 rounded-lg px-2 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                  >
                    <span className="mt-px text-xs text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9">
          <div className="mb-8 flex items-start gap-3 rounded-xl bg-[var(--surface-2)] p-4 sm:p-5">
            <Feather className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
            <p className="text-sm leading-6 text-[var(--muted)]">
              Please read these terms before using the community features. By
              browsing Shayari or creating an account, you agree to follow them.
            </p>
          </div>

          <section id="agreement" className="scroll-mt-32 border-b border-[var(--border)] pb-7">
            <h2 className={headingClass}>1. Agreement</h2>
            <p className={paragraphClass}>
              These Terms of Service apply to your access to and use of the Shayari
              website and its features (the “Service”). If you do not agree to
              these terms, do not use the Service. If you use it on behalf of
              someone else, you confirm that you are allowed to accept these terms
              for them.
            </p>
          </section>

          <section id="the-service" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>2. The service</h2>
            <p className={paragraphClass}>
              Shayari is a place to discover poetry and shayari, browse by mood or
              language, save bookmarks, and share submissions for review. We may
              add, change, pause, or remove features as the Service develops.
            </p>
          </section>

          <section id="accounts" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>3. Your account</h2>
            <p className={paragraphClass}>
              Some features require an account. Provide information that is
              accurate and keep your sign-in details secure. You are responsible
              for activity carried out through your account. Tell the site owner
              promptly if you believe someone else has accessed it.
            </p>
          </section>

          <section id="your-submissions" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>4. Your submissions</h2>
            <p className={paragraphClass}>
              You keep ownership of poetry, text, images, and other material you
              submit (“Your Content”). By submitting it, you confirm that you
              created it or have permission to share it and that your submission
              does not violate another person’s rights.
            </p>
            <p className={paragraphClass}>
              You give Shayari a non-exclusive, worldwide, royalty-free license to
              host, store, reproduce, format, display, and distribute Your Content
              as needed to operate the Service and make approved submissions
              available to visitors. This permission also allows our hosting and
              delivery providers to process the content for those purposes. It
              does not transfer ownership to Shayari or permit us to sell your
              work as a standalone product.
            </p>
            <p className={paragraphClass}>
              You can ask for a submission to be removed. Copies may remain for a
              limited time in backups or caches, or be retained where needed to
              meet legal obligations or resolve a dispute.
            </p>
          </section>

          <section id="community-rules" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>5. Community rules</h2>
            <p className={paragraphClass}>When using the Service, do not:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[var(--muted)] marker:text-[var(--primary)]">
              <li>break the law or violate another person’s privacy, copyright, or other rights;</li>
              <li>post threats, harassment, hate, spam, deceptive material, or content that exploits or endangers others;</li>
              <li>pretend to be another person or misrepresent who created a submission;</li>
              <li>upload malware, interfere with the Service, or try to access accounts or systems without permission; or</li>
              <li>use automated means to disrupt, copy, or collect from the Service in a way that harms it or its community.</li>
            </ul>
          </section>

          <section id="moderation" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>6. Review and moderation</h2>
            <p className={paragraphClass}>
              Member submissions may be reviewed before they appear publicly.
              Sending a submission does not guarantee that it will be published.
              We may decline, limit, or remove content or restrict an account when
              we believe it violates these terms, risks harm, or needs to be
              addressed for legal or operational reasons.
            </p>
          </section>

          <section id="rights" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>7. Content and ownership</h2>
            <p className={paragraphClass}>
              The Service’s design, branding, and materials provided by Shayari
              belong to the site owner or its licensors. You may read, bookmark,
              and share links to public pages for personal, lawful use. Do not
              copy or republish substantial parts of the Service or another
              person’s work without permission, except where applicable law allows
              it.
            </p>
          </section>

          <section id="availability" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>8. Availability and links</h2>
            <p className={paragraphClass}>
              We work to keep Shayari available, but cannot promise that it will
              always be uninterrupted, error-free, or available on every device.
              The Service may link to third-party websites or tools. Those
              services have their own terms and privacy practices, which we do
              not control.
            </p>
          </section>

          <section id="liability" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>9. Disclaimers and liability</h2>
            <p className={paragraphClass}>
              The Service and its content are provided as available. To the extent
              allowed by applicable law, we do not make warranties that the
              Service will meet every expectation or be available without
              interruption. Nothing in these terms excludes a right or remedy
              that the law does not allow to be excluded, or limits liability that
              cannot legally be limited.
            </p>
          </section>

          <section id="changes" className="scroll-mt-32 pt-7">
            <h2 className={headingClass}>10. Changes and termination</h2>
            <p className={paragraphClass}>
              We may update these terms as the Service changes. The updated date
              at the top of this page shows when the current version was last
              revised. If you continue using the Service after an update, you
              agree to the revised terms. You may stop using the Service at any
              time; we may suspend or end access when needed to enforce these
              terms or protect the Service and its community.
            </p>
          </section>

          <div className="mt-9 flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Ready to explore the collection or share a verse of your own?
            </p>
            <Link
              href="/categories"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline"
            >
              Browse shayari <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
