import formatRelativeTime from "@/shared/utils/formatRelativeTime";

export interface MatchDateLabelProps {
  matchDate: Date;
}
const MatchDateLabel = ({ matchDate }: MatchDateLabelProps) => {
  return (
    <time className="h-4 text-[16px] font-bold mobile:text-[12px] mobile:text-normal">
      {formatRelativeTime(matchDate)}
    </time>
  );
};

export default MatchDateLabel;
