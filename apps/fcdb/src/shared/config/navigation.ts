interface NavigationItem {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
}

export const navigationConfig: NavigationItem[] = [
  {
    href: "/",
    label: "전적검색",
    isActive: (pathname: string) => pathname === "/" || pathname === "/user",
  },
  {
    href: "/ranking",
    label: "랭킹",
    isActive: (pathname: string) => pathname === "/ranking",
  },
];
