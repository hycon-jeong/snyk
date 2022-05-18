interface IBaseStatus {
  ACTIVE: string;
  INACTIVE: string;
}

interface IUserStatus extends IBaseStatus {
  LOCK: string;
  EXPIRED: string;
}

export type baseStatus = keyof IBaseStatus;

export type userStatus = keyof IUserStatus;
