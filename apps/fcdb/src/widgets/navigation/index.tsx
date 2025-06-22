"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { navigationConfig } from "@/shared/config/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <header className="w-full min-w-[366px] h-[50px] flex items-center mobile:h-[56px] bg-gray-900 fixed top-0 left-0 z-50 px-4">
      <div className="w-full max-w-[1080px] h-full mx-auto flex items-center justify-start gap-[84px]">
        {/* Logo */}
        <Link
          href="/"
          className="w-[108px] h-[20px] min-w-[108px] min-h-[20px] shrink-0 flex items-center"
        >
          <Image src="/logo.svg" alt="logo" width={108} height={20} />
        </Link>

        <nav className="h-full flex items-center gap-[36px]">
          {navigationConfig.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={item.isActive(pathname)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
