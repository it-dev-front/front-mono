import { PlayerProfileCard } from "@/entities/profile/ui/PlayerProfileCard";
import { Typography } from "@/shared/ui/typography";
import { ReactElement } from "react";

const MOCK_DATA = {
  ouid: "string",
  nickname: "훈다",
  level: 93,
};

const spIds = [289015723, 801261593, 832246430, 829107715, 829005099];
const randomSpId = spIds[Math.floor(Math.random() * spIds.length)] || 289015723;

export const ProfileBox = (): ReactElement => {
  return (
    <div className="flex items-center gap-[24px]">
      <PlayerProfileCard spId={randomSpId} />
      <div className="flex flex-col gap-[8px]">
        <Typography fontSize={20}>{MOCK_DATA.nickname}</Typography>
        <Typography fontSize={18}>Lv. {MOCK_DATA.level}</Typography>
      </div>
    </div>
  );
};
