import { divisionMetaData } from "@/shared/lib/divisionMetaData";
import Image from "next/image";
import { ReactElement } from "react";
import { findDivisionLabel } from "./DivisionLabel";

interface TierImageProps {
  divisionId: number;
}

const findTierImage = (divisionId: number): string => {
  return (
    divisionMetaData.find((item) => item.divisionId === divisionId)
      ?.imageSource || "/not-found-image.png"
  );
};

export const TierImage = ({ divisionId }: TierImageProps): ReactElement => {
  const imageSource = findTierImage(divisionId);
  return (
    <Image
      className={"border-solid border-1 rounded-[50%]"}
      src={imageSource}
      alt={`${findDivisionLabel(divisionId)}_티어_이미지`}
      width={80}
      height={80}
    />
  );
};
