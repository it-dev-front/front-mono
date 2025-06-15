import { matchApi, userApi, metaApi } from "../api";

export const apiFactoryMap = {
  User: userApi,
  Match: matchApi,
  Meta: metaApi,
} as const;
