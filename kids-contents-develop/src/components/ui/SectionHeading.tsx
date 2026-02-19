import clsx from "clsx";

export function SectionHeading({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={clsx("space-y-2", className)}>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
      {subtitle ? <p className="text-slate-600 text-base lg:text-lg max-w-3xl">{subtitle}</p> : null}
    </div>
  );
}
