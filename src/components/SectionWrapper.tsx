import { ReactNode } from "react";

export default function SectionWrapper({
  id,
  children,
  className = "",
  tint = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section id={id} className={`relative w-full scroll-mt-24 ${tint ? "bg-paper-200" : ""}`}>
      <div className={`mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 md:px-10 ${className}`}>{children}</div>
    </section>
  );
}
