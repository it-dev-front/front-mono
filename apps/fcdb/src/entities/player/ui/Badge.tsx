import clsx from "clsx";
import Image from "next/image";

interface MvpBadgeProps {
  isMvp: boolean;
}

const MvpBadge = ({ isMvp }: MvpBadgeProps) => {
  if (!isMvp) return null;

  return (
    <div className="flex items-center justify-center absolute top-0 -left-[28px] w-[42px] h-[25px] mobile:-left-[10px] mobile:w-[30px] mobile:h-[18px] bg-[#ABEE02] text-[#000000] rounded-sm z-1">
      <span className="font-medium mobile:font-[700] mobile:text-[10px]">
        MVP
      </span>
    </div>
  );
};

interface SeasonBadgeProps {
  seasonImg: string;
}

// 4px 겹쳐짐
const SeasonBadge = ({ seasonImg }: SeasonBadgeProps) => {
  return (
    <div className="relative w-[39px] h-[25px] mobile:w-[30px] mobile:h-[18px] rounded-[4px] overflow-hidden">
      <Image
        unoptimized
        src={seasonImg}
        fill
        className="object-fill"
        alt="season-badge"
      />
    </div>
  );
};

interface GradeBadgeProps {
  spGrade: number;
}

const GradeBadge = ({ spGrade }: GradeBadgeProps) => {
  //TODO: bg 스타일 tailwind에 정의
  const baseStyle =
    "flex items-center justify-center w-[25px] h-[25px] rounded-[4px] mobile:w-[18px] mobile:h-[18px] text-[14px] mobile:text-[12px]";
  const textColor = spGrade < 5 ? "text-gray-100" : "text-gray-900";
  const backgroundColor =
    spGrade < 2
      ? "bg-[#607D8B]"
      : spGrade < 5
        ? "bg-[#BC7350]"
        : spGrade < 8
          ? "bg-[#CBCED5]"
          : "bg-[#FFFB34]";

  return (
    <div className={clsx(baseStyle, textColor, backgroundColor)}>{spGrade}</div>
  );
};

const Badge = {
  Mvp: MvpBadge,
  Season: SeasonBadge,
  Grade: GradeBadge,
};

export default Badge;
