import { API_URL, NEXON_API_KEY } from "@/app/(app)/config/env";
import { ApiRequestConfig, ApiErrorResponse } from "../types";
import { apiFactoryMap } from "../model/apiFactoryMap";

console.log(API_URL, NEXON_API_KEY);

type ApiFactoryMap = typeof apiFactoryMap;
type ApiType = keyof ApiFactoryMap;

const buildUrl = (url: string, query?: Record<string, any>) => {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";

  // "http://"로 시작할 경우 API_URL 없이 url 사용(Meta API URL 대응)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `${url}${qs}`;
  }

  return `${API_URL}${url}${qs}`;
};

export class FcClient {
  private static async request<T>(
    url: string,
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body, query } = config;
    const targetUrl = buildUrl(url, query);

    try {
      const response = await fetch(targetUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-nxopen-api-key": NEXON_API_KEY,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
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
