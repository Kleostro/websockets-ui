export const WS_MESSAGE_TYPE = {
  REG: "reg",
  CREATE_ROOM: "create_room",
  UPDATE_ROOM: "update_room",
  ADD_USER_TO_ROOM: "add_user_to_room",
} as const;

export type WSMessageType =
  (typeof WS_MESSAGE_TYPE)[keyof typeof WS_MESSAGE_TYPE];
