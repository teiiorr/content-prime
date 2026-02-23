import clsx from "clsx";

export function SectionHeading({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={clsx("space-y-2.5", className)}>
      <h2 className="text-3xl font-bold tracking-tight leading-[1.12] text-slate-900 lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-3xl text-[15px] leading-7 text-slate-600 lg:text-lg lg:leading-8">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
