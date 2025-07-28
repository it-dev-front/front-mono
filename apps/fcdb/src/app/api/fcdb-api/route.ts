import { NextRequest, NextResponse } from "next/server";

const API_CONFIG = {
  nexon: {
    baseUrl: process.env.NEXT_PUBLIC_FCONLINE_API_URL,
    apiKey: process.env.FCONLINE_PROD_API_KEY,
  },
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const service = searchParams.get("service") || "nexon";
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

  const { baseUrl, apiKey } = API_CONFIG[service as keyof typeof API_CONFIG];

  const fetchUrl =
    baseUrl +
    path +
    (queryParams.toString()
      ? (path.includes("?") ? "&" : "?") + queryParams.toString()
      : "");

  try {
    const res = await fetch(fetchUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-nxopen-api-key": apiKey as string,
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
