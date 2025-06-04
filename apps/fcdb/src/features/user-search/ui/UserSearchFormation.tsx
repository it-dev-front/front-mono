import Image from "next/image";
import { PositionIndicator } from "@/entities/formation/ui/PositionIndicator";

export const UserSearchFormation = () => {
  return (
    <div>
      <p className="text-center text-[20px] pt-[16px] pb-[14px]">스쿼드 정보</p>
      <div className="flex gap-[24px] px-[20px]">
        <PositionIndicator color="#CE535D" label="FW" />
        <PositionIndicator color="#79CD8C" label="MF" />
        <PositionIndicator color="#507EED" label="DF" />
      </div>
      <div className="pt-[12px]">
        <Image
          src="/images/soccer_coat.png"
          alt="soccer-coat"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto px-[20px]"
        />
      </div>
    </div>
  );
};
