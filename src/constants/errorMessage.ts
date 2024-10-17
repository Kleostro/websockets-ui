export const ERROR_MESSAGE = {
  BAD_CREDENTIALS: "Bad credentials",
} as const;

export type ErrorMessageType =
  (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE];
