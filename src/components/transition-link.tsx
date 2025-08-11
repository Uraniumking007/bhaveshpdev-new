"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "@/lib/context/TransitionContext";

export default function TransitionLink({ href, children, ...props }: any) {
  const router = useRouter();
  const { startExit } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      href.startsWith("http")
    ) {
      return;
    }
    e.preventDefault();
    startExit(() => router.push(href));
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
