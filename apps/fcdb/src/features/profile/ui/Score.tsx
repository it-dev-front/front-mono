"use client";

import { CircularProgressBar } from "@/shared/ui/progressbar/CircularProgressBar";
import { Typography } from "@/shared/ui/typography";
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
    return !score ? 0 : score;
  };

  return (
    <div className="flex flex-col gap-4">
      <CircularProgressBar percentage={isScore(score?.winRate)} />
      <p className="flex gap-2">
        <Typography as={"span"} fontSize={fontSize}>
          {isScore(score?.total)}전
        </Typography>
        <Typography as={"span"} fontSize={fontSize}>
          {isScore(score?.win)}승
        </Typography>
        <Typography as={"span"} fontSize={fontSize}>
          {isScore(score?.defeat)}패
        </Typography>
        <Typography as={"span"} fontSize={fontSize}>
          {isScore(score?.draw)}무
        </Typography>
      </p>
    </div>
  );
};
