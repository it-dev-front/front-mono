"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { Typography } from "@/shared/ui/typography";

export const Header = () => {
  const pathname = usePathname();

  const isUserSearchPage = pathname === "/" || pathname === "/user";
  const isRankingPage = pathname === "/ranking";

  return (
    <header className="w-full min-w-[366px] bg-gray-900 fixed top-0 left-0 z-50 px-4 py-4">
      <div className="max-w-[1080px] mx-auto flex items-center justify-start gap-[84px]">
        {/* Logo */}
        <Link
          href="/"
          className="w-[108px] h-[20px] min-w-[108px] min-h-[20px] shrink-0 flex items-center"
        >
          <Image src="/logo.svg" alt="logo" width={108} height={20} />
        </Link>

        <nav className="flex items-center gap-[36px]">
          <Link
            href="/"
            className={clsx(
              "pb-2.5",
              isUserSearchPage && "border-b-2 border-primary-300"
            )}
          >
            <Typography
              fontSize={16}
              fontWeight={400}
              className="text-primary-300"
            >
              전적검색
            </Typography>
          </Link>
          <Link
            href="/ranking"
            className={clsx(
              "pb-2.5",
              isRankingPage && "border-b-2 border-primary-300"
            )}
          >
            <Typography
              fontSize={16}
              fontWeight={400}
              className="text-primary-300"
            >
              랭킹
            </Typography>
          </Link>
        </nav>
      </div>
    </header>
  );
};
