"use client";
import { useEffect, useState } from "react";

interface UseSwiperPaddingOptions {
  titleSelector?: string;
  paddingSelector?: string;
  delay?: number;
}

export function useSwiperPadding(options: UseSwiperPaddingOptions = {}) {
  const {
    titleSelector = ".swiper-title",
    paddingSelector = ".swiper-padding",
    delay = 10,
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);

  const addLeftPaddingSwiper = () => {
    const swiperTitle = document.querySelector(titleSelector) as HTMLElement;
    const swiperPadding = document.querySelector(
      paddingSelector
    ) as HTMLElement;

    if (swiperTitle && swiperPadding) {
      const titleRect = swiperTitle.getBoundingClientRect();
      if (titleRect) {
        swiperPadding.style.paddingLeft = `${titleRect.left}px`;
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        addLeftPaddingSwiper();
      }, delay);
    }, delay);

    const handleResize = () => {
      if (isLoaded) {
        addLeftPaddingSwiper();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, titleSelector, paddingSelector, delay]);

  return { isLoaded, addLeftPaddingSwiper };
}
