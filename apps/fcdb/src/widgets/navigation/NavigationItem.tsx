import Link from "next/link";

interface NavigationItemProps {
  href: string;
  label: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export const NavigationItem = ({ href, label, ref }: NavigationItemProps) => {
  return (
    <Link ref={ref} href={href} className="h-full flex items-center relative">
      <p className="text-[16px] font-normal text-primary-300">{label}</p>
    </Link>
  );
};
