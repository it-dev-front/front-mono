import { ReactElement } from "react";
import { divisionMetaData } from "@/shared/lib/divisionMetaData";
import { DivisionType } from "../types/divisionType";

interface DivisionLabelProps {
  divisionId: number;
}

export const findDivisionLabel = (divisionId: number): string => {
  return (
    divisionMetaData.find(
      (item: DivisionType) => item.divisionId === divisionId
    )?.divisionName || ""
  );
};

export const DivisionLabel = ({
  divisionId,
}: DivisionLabelProps): ReactElement => {
  return <p>{findDivisionLabel(divisionId)}</p>;
};
