import { CircularProgressBar } from "@/shared/ui/progressbar/CircularProgressBar";
import { Typography } from "@/shared/ui/typography";
import { ReactElement } from "react";

type ScoreType = {
  total: number;
  win: number;
  defeat: number;
  draw: number;
};

const MOCK_DATA: ScoreType = {
  total: 34,
  win: 23,
  defeat: 7,
  draw: 4,
};

const calcScorePercentage = (score: ScoreType): number => {
  const { total, win } = score;
  if (total === 0) return 0;
  return Math.round((win / total) * 100);
};

export const Score = (): ReactElement => {
  const percentage = calcScorePercentage(MOCK_DATA);

  return (
    <div className="flex flex-col gap-4">
      <CircularProgressBar percentage={percentage} />
      <p className="flex gap-2">
        <Typography as={"span"}>{MOCK_DATA.total}전</Typography>
        <Typography as={"span"}>{MOCK_DATA.win}승</Typography>
        <Typography as={"span"}>{MOCK_DATA.defeat}패</Typography>
        <Typography as={"span"}>{MOCK_DATA.draw}무</Typography>
      </p>
    </div>
  );
};
