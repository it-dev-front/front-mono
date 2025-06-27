"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { navigationConfig } from "@/shared/config/navigation";
import { useSlideUnderlineAnimation } from "@/shared/hooks";

export const Navigation = () => {
  const pathname = usePathname();

  const activeIndex = navigationConfig.findIndex((item) =>
    item.isActive(pathname)
  );

  const { containerRef, setItemRef, underlineProps } =
    useSlideUnderlineAnimation(activeIndex);

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

        <nav
          ref={containerRef}
          className="h-full flex items-center gap-[36px] relative"
        >
          {navigationConfig.map((item, index) => (
            <NavigationItem
              key={index}
              ref={setItemRef(index)}
              href={item.href}
              label={item.label}
            />
          ))}

          <div {...underlineProps} />
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
