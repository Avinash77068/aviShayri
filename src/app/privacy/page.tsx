import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Feather, ShieldCheck } from "lucide-react";
import { breadcrumbJsonLd, pageSocialMetadata, serializeJsonLd } from "@/lib/seo";

const description =
  "Learn what information Shayari uses, why it is needed, and the choices you have when using the website.";
const breadcrumbData = {
  "@context": "https://schema.org",
  ...breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ])!,
};

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  ...pageSocialMetadata({ title: "Privacy Policy", description, path: "/privacy" }),
};

const sections = [
  { id: "scope", label: "About this policy" },
  { id: "information", label: "Information we use" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "public-content", label: "Public submissions" },
  { id: "cookies", label: "Cookies and browser storage" },
  { id: "sharing", label: "When information is shared" },
  { id: "retention-security", label: "Retention and security" },
  { id: "your-choices", label: "Your choices" },
  { id: "children", label: "Children’s privacy" },
  { id: "updates-contact", label: "Updates and contact" },
];

const headingClass = "text-xl font-bold tracking-tight sm:text-2xl";
const paragraphClass = "mt-3 leading-7 text-[var(--muted)]";
const listClass = "mt-3 list-disc space-y-2 pl-5 leading-7 text-[var(--muted)] marker:text-[var(--primary)]";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span aria-current="page" className="text-[var(--foreground)]">Privacy Policy</span>
      </nav>

      <header className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-6 py-9 shadow-sm sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Your privacy
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Here’s what information is used when you read, save, or share shayari
            on Shayari, and how you can manage it.
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
          <nav aria-label="Privacy policy sections">
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
              This policy describes the information handled by the Shayari website
              and its account, bookmark, submission, and analytics features.
            </p>
          </div>

          <section id="scope" className="scroll-mt-32 border-b border-[var(--border)] pb-7">
            <h2 className={headingClass}>1. About this policy</h2>
            <p className={paragraphClass}>
              “Shayari,” “we,” and “us” refer to the operator of this website. This
              policy applies to information handled when you visit or use the
              website. It does not cover third-party websites or services that
              have their own privacy notices.
            </p>
          </section>

          <section id="information" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>2. Information we use</h2>
            <p className={paragraphClass}>Depending on how you use the site, this may include:</p>
            <ul className={listClass}>
              <li>
                <span className="font-semibold text-[var(--foreground)]">Account details:</span> your name, email address, password hash, profile image, and account status.
              </li>
              <li>
                <span className="font-semibold text-[var(--foreground)]">Content you provide:</span> shayari, titles, excerpts, selected categories or languages, and images you upload for a submission or profile.
              </li>
              <li>
                <span className="font-semibold text-[var(--foreground)]">Your activity:</span> bookmarks, likes, shares, recently viewed shayari, and other interactions used by site features and aggregate counters.
              </li>
              <li>
                <span className="font-semibold text-[var(--foreground)]">Technical and security data:</span> information such as IP address, browser or device details, and request records that help deliver, troubleshoot, and protect the service.
              </li>
            </ul>
            <p className={paragraphClass}>
              If you create an account, the password is stored as a one-way hash,
              rather than as readable text. Images are stored using the media
              storage configured for the service; this can include Cloudinary.
            </p>
          </section>

          <section id="how-we-use-it" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>3. How we use information</h2>
            <ul className={listClass}>
              <li>to create and secure accounts, sign you in, and support password resets and email verification;</li>
              <li>to show your profile, save bookmarks, remember reactions, and provide recently viewed content;</li>
              <li>to receive, review, publish, and manage shayari and image submissions;</li>
              <li>to understand site usage, measure readership and engagement, and improve the service;</li>
              <li>to diagnose errors, prevent misuse, protect accounts, and maintain the service; and</li>
              <li>to meet legal obligations and respond to valid legal requests.</li>
            </ul>
          </section>

          <section id="public-content" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>4. Public submissions</h2>
            <p className={paragraphClass}>
              A shayari submission from a member is reviewed before it is
              published. If approved, its text and any attached image may be
              visible to anyone, including through search engines and sharing
              links. A display name or attribution included with the content may
              also appear. Do not include private information in material you
              intend to share publicly.
            </p>
            <p className={paragraphClass}>
              Your account email and password are not part of a public shayari
              page. Public submissions can remain available after you sign out.
              You can request that a submission be removed by contacting the
              site owner using the support details they publish.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>5. Cookies and browser storage</h2>
            <p className={paragraphClass}>
              The site uses cookies and browser storage to make features work.
              These may be used to:
            </p>
            <ul className={listClass}>
              <li>keep an account signed in and maintain its session;</li>
              <li>remember a light or dark theme preference; and</li>
              <li>
                remember a signed-out visitor’s likes or bookmarks. When a guest
                uses these features, the service may set a random visitor cookie
                that currently lasts for up to one year.
              </li>
            </ul>
            <p className={paragraphClass}>
              We also use Google Analytics to understand visits and how people
              use the site. Google Analytics may use cookies or similar
              technologies to collect browser and usage information. Read
              Google&apos;s{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--primary)] underline underline-offset-4"
              >
                Privacy Policy
              </a>
              . You can manage cookies in your browser settings. Blocking browser
              storage may affect sign-in, theme, or guest bookmark features.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>6. When information is shared</h2>
            <p className={paragraphClass}>
              We use service providers to run the website and its features. As
              needed, information may be processed by providers for hosting,
              database and media storage, email delivery, security, and analytics.
              Google receives information through Google Analytics, and an image
              provider such as Cloudinary may process uploaded images when it is
              configured for the service.
            </p>
            <p className={paragraphClass}>
              We may also disclose information when required by law, to respond
              to valid legal process, or to protect users, the site, and their
              rights. Public submissions are visible as described above.
            </p>
          </section>

          <section id="retention-security" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>7. Retention and security</h2>
            <p className={paragraphClass}>
              We keep information for as long as it is needed to provide the
              service, maintain accounts and published content, protect the site,
              resolve issues, and meet legal obligations. Published shayari may
              remain visible until it is removed. Security logs, backups, and
              technical records may be retained for different periods depending
              on their purpose.
            </p>
            <p className={paragraphClass}>
              We take steps to protect information, but no website or online
              storage can be guaranteed completely secure.
            </p>
          </section>

          <section id="your-choices" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>8. Your choices</h2>
            <ul className={listClass}>
              <li>Update your display name or profile image and change your password from your Profile page.</li>
              <li>Sign out to end your current account session.</li>
              <li>Use your browser settings to clear or block cookies and local storage; some features may then stop working.</li>
              <li>
                For requests to access, correct, or delete account information,
                or to remove a public submission, contact the site owner using
                the support details published on the site. We may need to verify
                that a request is yours and will handle it under applicable law.
              </li>
            </ul>
          </section>

          <section id="children" className="scroll-mt-32 border-b border-[var(--border)] py-7">
            <h2 className={headingClass}>9. Children’s privacy</h2>
            <p className={paragraphClass}>
              The service is not designed to collect personal information from
              children in a way that violates applicable law. If you believe a
              child has provided personal information, contact the site owner
              using the support details they publish so it can be reviewed.
            </p>
          </section>

          <section id="updates-contact" className="scroll-mt-32 pt-7">
            <h2 className={headingClass}>10. Updates and contact</h2>
            <p className={paragraphClass}>
              We may update this policy when the service or its data practices
              change. The date at the top of this page shows when it was last
              revised. For questions or privacy requests, contact the site owner
              using the contact details published by the service.
            </p>
            <p className={paragraphClass}>
              You can also read our <Link href="/terms" className="font-medium text-[var(--primary)] underline underline-offset-4">Terms of Service</Link>.
            </p>
          </section>

          <div className="mt-9 flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Your reading and bookmarks make the collection yours.
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
