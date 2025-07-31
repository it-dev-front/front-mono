import { type NextRequest } from "next/server";
import { supabase } from "@/shared/utils/supabase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  const from = (page - 1) * pageSize;
  const to = from + pageSize;

  const { data, error } = await supabase
    .from("ranking")
    .select("*")
    .order("rankNo", { ascending: true })
    .range(from, to);

  const hasNextPage = data && data.length > pageSize;
  const pageData = hasNextPage ? data.slice(0, pageSize) : data;

  return Response.json({
    data: pageData,
    error,
    hasNextPage,
  });
}
