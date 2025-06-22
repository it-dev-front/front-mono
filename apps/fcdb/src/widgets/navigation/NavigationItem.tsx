import Link from "next/link";
import { motion } from "framer-motion";
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
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary-300"
          initial={false}
          transition={{
            type: "spring" as const,
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
};
