import { UserProfileType } from "@/entities/profile/types/user-profile.types";
import { ReactElement } from "react";

interface ProfileBoxProps {
  user: UserProfileType;
}

export const ProfileBox = ({ user }: ProfileBoxProps): ReactElement => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[20px]">{user.nickname}</p>
      <p className="text-[18px]">Lv. {user.level}</p>
    </div>
  );
};
