export const SHIP_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  HUGE: "huge",
} as const;

export type ShipSizeType = keyof typeof SHIP_SIZES;
