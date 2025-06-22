import Link from "next/link";
import { Typography } from "@/shared/ui/typography";

interface NavigationItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export const NavigationItem = ({
  href,
  label,
  isActive,
}: NavigationItemProps) => {
  return (
    <Link href={href} className="h-full flex items-center relative">
      <Typography fontSize={16} fontWeight={400} className="text-primary-300">
        {label}
      </Typography>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-300" />
      )}
    </Link>
  );
};
