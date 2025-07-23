import { NextRequest, NextResponse } from "next/server";

const API_CONFIG = {
  nexon: {
    baseUrl: "https://open.api.nexon.com",
    apiKey: process.env.FCONLINE_PROD_API_KEY,
  },
  // 외부 API 추가 시 예시
  // naver: {
  //   baseUrl: "https://openapi.naver.com",
  //   apiKey: process.env.NAVER_API_KEY,
  // },
} as const;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  // service 체크 후 없으면 기본값 'nexon' 사용
  const service =
    (searchParams.get("service") as keyof typeof API_CONFIG | null) || "nexon";
  if (!(service in API_CONFIG)) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }

  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // service, path 제외 쿼리 파라미터만 추출
  const queryParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== "service" && key !== "path") {
      queryParams.append(key, value);
    }
  });

  const { baseUrl, apiKey } = API_CONFIG[service];

  let finalUrl = baseUrl + path;
  if (queryParams.toString()) {
    finalUrl += (path.includes("?") ? "&" : "?") + queryParams.toString();
  }

  console.log("@@@ finalUrl", finalUrl);

  try {
    const res = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "x-nxopen-api-key": apiKey } : {}),
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Proxy fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch from external API" },
      { status: 500 }
    );
  }
}
