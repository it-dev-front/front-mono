import { POSITION_CATEGORY } from "@/shared/constant/position";

export const getPositionColor = (positionCategory: "fw" | "mf" | "df" | "gk" | "") => {
    switch (positionCategory) {
      case "fw":
        return "#CE535D";
      case "mf":
        return "#79CD8C";
      case "df":
        return "#507EED";
      case "gk":
        return "#E67E22";
    }

    return "";
  };

  export const findPositionCategory = (position: string): "fw" | "mf" | "df" | "gk" | "" => {
    if (POSITION_CATEGORY.fw.includes(position)) return "fw";
    if (POSITION_CATEGORY.mf.includes(position)) return "mf";
    if (POSITION_CATEGORY.df.includes(position)) return "df";
    if (position === "GK")return "gk";
    
    return "";
  };