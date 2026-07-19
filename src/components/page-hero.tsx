export function PageHero({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-6 text-center sm:pt-20">
      {emoji && <div className="mb-3 text-4xl">{emoji}</div>}
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">{subtitle}</p>}
    </div>
  );
}
