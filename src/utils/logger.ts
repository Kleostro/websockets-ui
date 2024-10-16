import { COLORS, ColorsType } from "../constants/logger";

export const logger = (message: string, color: ColorsType) => {
  console.log(color, message, String(COLORS.white));
};
