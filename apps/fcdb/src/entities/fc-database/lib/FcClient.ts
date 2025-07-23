import { API_URL, NEXON_API_KEY } from "@/app/(app)/config/env";
import { ApiErrorResponse } from "../types";
import { apiFactoryMap } from "../model/apiFactoryMap";

type ApiFactoryMap = typeof apiFactoryMap;
type ApiType = keyof ApiFactoryMap;

const buildUrl = (url: string, query?: Record<string, any>) => {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";

  // "http://"로 시작할 경우 API_URL 없이 url 사용(Meta API URL 대응)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `${url}${qs}`;
  }
  console.log(
    "@@@",
    `${"http://localhost:3000/api/fcdb-api?path="}${url}${qs}`
  );

  return `${"http://localhost:3000/api/fcdb-api?path="}${url}${qs}`;
};

export class FcClient {
  private static async request<T>(
    url: string,
    config: RequestInit = {},
    query?: Record<string, any>
  ): Promise<T> {
    const targetUrl = buildUrl(url, query);

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxopen-api-key": NEXON_API_KEY,
          ...config.headers,
        },
        ...config,
      });

      const json = await response.json();

      if (!response.ok) {
        const apiError = json as ApiErrorResponse;
        throw new Error(
          `[${apiError.error?.name ?? "UnknownError"}] ${apiError.error?.message ?? "Unknown error"}`
        );
      }

      return json as T;
    } catch (e) {
      console.error("API 요청 중 에러 발생:", e);
      throw e;
    }
  }

  static get<T extends ApiType>(type: T): ReturnType<ApiFactoryMap[T]> {
    const factory = apiFactoryMap[type];
    return factory(this.request);
  }
}
