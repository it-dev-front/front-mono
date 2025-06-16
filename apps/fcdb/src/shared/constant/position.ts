export const POSITION = {
  0: "GK",
  1: "SW",
  2: "RWB",
  3: "RB",
  4: "RCB",
  5: "CB",
  6: "LCB",
  7: "LB",
  8: "LWB",
  9: "RDM",
  10: "CDM",
  11: "LDM",
  12: "RM",
  13: "RCM",
  14: "CM",
  15: "LCM",
  16: "LM",
  17: "RAM",
  18: "CAM",
  19: "LAM",
  20: "RF",
  21: "CF",
  22: "LF",
  23: "RW",
  24: "RS",
  25: "ST",
  26: "LS",
  27: "LW",
  28: "SUB",
};

export const POSITION_LOCATIONS = {
  1: ["", "", "GK", "", ""],
  2: ["", "", "SW", "", ""],
  3: ["LB", "LCB", "CB", "RCB", "RB"],
  4: ["LWB", "", "", "", "RWB"],
  5: ["", "LDM", "CDM", "RDM", ""],
  6: ["LM", "LCM", "CAM", "RCM", "RM"],
  7: ["", "LAM", "AM", "RAM", ""],
  8: ["LF", "LCF", "CF", "RCF", "RF"],
  9: ["LW", "LS", "ST", "RS", "RW"],
};

type PositionCategoryKeyType = "fw" | "mf" | "df" | "gk";

export const POSITION_CATEGORY: Record<PositionCategoryKeyType, string[]> = {
  fw: [...POSITION_LOCATIONS[9], ...POSITION_LOCATIONS[8]].filter(
    (position) => position
  ),
  mf: [
    ...POSITION_LOCATIONS[7],
    ...POSITION_LOCATIONS[6],
    ...POSITION_LOCATIONS[5],
  ].filter((position) => position),
  df: [
    ...POSITION_LOCATIONS[4],
    ...POSITION_LOCATIONS[3],
    ...POSITION_LOCATIONS[2],
  ].filter((position) => position),
  gk: [...POSITION_LOCATIONS[1]].filter((position) => position),
};
