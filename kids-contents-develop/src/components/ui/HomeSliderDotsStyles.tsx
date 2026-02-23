"use client";

export function HomeSliderDotsStyles({
  bulletClass,
}: {
  bulletClass: string;
}) {
  return (
    <style jsx global>{`
      .${bulletClass} {
        width: 7px;
        height: 7px;
        border-radius: 9999px;
        background: rgba(15, 23, 42, 0.18);
        transition: width 220ms ease, background-color 220ms ease, transform 220ms ease,
          opacity 220ms ease;
        display: inline-block;
        opacity: 0.8;
        transform: scale(1);
      }

      .${bulletClass}.is-active {
        opacity: 1;
        transform: scale(1.02);
      }
    `}</style>
  );
}

// Caller controls active color/width via additional global styles when needed.
