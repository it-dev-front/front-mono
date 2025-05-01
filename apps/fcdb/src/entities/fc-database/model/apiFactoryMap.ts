import { matchApi, userApi } from "../api";

export const apiFactoryMap = {
  User: userApi,
  Match: matchApi,
} as const;
