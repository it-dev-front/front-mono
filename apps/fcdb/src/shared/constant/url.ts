import { isProd } from "@/shared/lib/environment";

export const FCONLINE_API_URL = "https://open.api.nexon.com/fconline";
export const baseUrl = isProd
  ? "https://www.fcdb.co.kr"
  : "http://localhost:3000";
