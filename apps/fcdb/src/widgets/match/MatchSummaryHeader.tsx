import MatchDateLabel from "@/entities/match/ui/MatchDateLabel";
import MatchResultLabel from "@/entities/match/ui/MatchResultLabel";
import MatchTypeLabel from "@/entities/match/ui/MatchTypeLabel";

interface MatchSummaryHeaderProps {
  matchType: number;
  matchResult: string;
  matchDate: Date;
}

const MatchSummaryHeader = ({
  matchType,
  matchResult,
  matchDate,
}: MatchSummaryHeaderProps) => {
  console.log(matchResult);
  return (
    <div className="w-[80px] h-[103px] flex flex-col gap-4 items-center text-color-white text-center leading-none mobile:hidden ml-[24px]">
      <div className="flex flex-col gap-2">
        <MatchTypeLabel matchType={matchType} />
        <MatchResultLabel matchResult={matchResult as "승" | "패" | "무"} />
      </div>

      <div className="w-[60px] h-[0px] border-[1px] border-color-white" />

      <MatchDateLabel matchDate={new Date(matchDate)} />
    </div>
  );
};

export default MatchSummaryHeader;
