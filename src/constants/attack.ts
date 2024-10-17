export const ATTACK_STATUS = {
  MISS: "miss",
  KILLED: "killed",
  SHOT: "shot",
} as const;

export type AttackStatusType =
  (typeof ATTACK_STATUS)[keyof typeof ATTACK_STATUS];
