export const WS_MESSAGE_TYPE = {
  REG: "reg",
} as const;

export type WSMessageType =
  (typeof WS_MESSAGE_TYPE)[keyof typeof WS_MESSAGE_TYPE];
