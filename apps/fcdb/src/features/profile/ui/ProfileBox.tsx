import { UserProfileType } from "@/entities/profile/types/user-profile.types";
import { Typography } from "@/shared/ui/typography";
import { ReactElement } from "react";

interface ProfileBoxProps {
  user: UserProfileType;
}

export const ProfileBox = ({ user }: ProfileBoxProps): ReactElement => {
  return (
    <div className="flex flex-col gap-[8px]">
      <Typography fontSize={20}>{user.nickname}</Typography>
      <Typography fontSize={18}>Lv. {user.level}</Typography>
    </div>
  );
};
