"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();

  const isPlayer = pathname === "/" || pathname === "/player";
  const isRanking = pathname === "/ranking";

  return (
    <header className="w-full bg-gray-900 sticky top-0 z-10 flex items-center px-24 py-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={108} height={20} />
      </Link>
      <nav className="space-x-10 text-primary-300 text-xl pl-24">
        <Link
          href="/"
          className={clsx(
            "pb-2.5",
            isPlayer && "border-b-2 border-primary-300"
          )}
        >
          전적검색
        </Link>
        <Link
          href="/ranking"
          className={clsx(
            "pb-2.5",
            isRanking && "border-b-2 border-primary-300"
          )}
        >
          랭킹
        </Link>
      </nav>
    </header>
  );
};
