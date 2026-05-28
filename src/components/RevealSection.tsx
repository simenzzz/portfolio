import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./RevealSection.module.css";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  id?: string;
  labelledBy?: string;
};

export function RevealSection({
  children,
  className,
  delayMs = 0,
  id,
  labelledBy
}: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof window.IntersectionObserver !== "function") {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, isVisible ? styles.visible : "", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </section>
  );
}
