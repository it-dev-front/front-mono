import Link from "next/link";
import { Typography } from "@/shared/ui/typography";

interface NavigationItemProps {
  href: string;
  label: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export const NavigationItem = ({ href, label, ref }: NavigationItemProps) => {
  return (
    <Link ref={ref} href={href} className="h-full flex items-center relative">
      <Typography fontSize={16} fontWeight={400} className="text-primary-300">
        {label}
      </Typography>
    </Link>
  );
};
