"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export function SplashScreen({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={[
        "splash-screen",
        isVisible ? "splash-screen--visible" : "splash-screen--hidden",
      ].join(" ")}
      aria-hidden={!isVisible}
    >
      <div className="splash-screen__background" />
      <div className="splash-screen__logo-shell">
        <img
          src="/logo.svg"
          alt="Bolalar kontentini rivojlantirish markazi"
          width={560}
          height={205}
          className="splash-screen__logo"
        />
      </div>
    </div>
  );
}

export function SplashScreenGate({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setIsVisible(false), 1700);
    const unmountTimer = setTimeout(() => setIsMounted(false), 2200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <>
      {children}
      {isMounted && <SplashScreen isVisible={isVisible} />}
    </>
  );
}
