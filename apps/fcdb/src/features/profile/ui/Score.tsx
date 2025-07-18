"use client";

import { CircularProgressBar } from "@/shared/ui/progressbar/CircularProgressBar";
import { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";

export type ScoreType = {
  total: number;
  win: number;
  defeat: number;
  draw: number;
  winRate: number;
};

export const Score = ({ score }: { score: ScoreType }): ReactElement => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const fontSize = isMobile ? 12 : 16;
  const isScore = (score: number): number => {
    return !score ? 0 : Math.floor(score);
  };

  return (
    <div className="flex flex-col gap-4">
      <CircularProgressBar percentage={isScore(score?.winRate)} />
      <div className="flex gap-2">
        <span className={`text-[${fontSize}px]`}>
          {isScore(score?.total)}전
        </span>
        <span className={`text-[${fontSize}px]`}>{isScore(score?.win)}승</span>
        <span className={`text-[${fontSize}px]`}>
          {isScore(score?.defeat)}패
        </span>
        <span className={`text-[${fontSize}px]`}>{isScore(score?.draw)}무</span>
      </div>
    </div>
  );
};
