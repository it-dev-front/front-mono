import { supabase } from "@/shared/utils/supabase";

export const getRanking = async (page: number, pageSize: number = 20) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;

  const { data, error } = await supabase
    .from("ranking")
    .select("*")
    .order("rankNo", { ascending: true })
    .range(from, to); // 한 개 더 가져옴

  const hasNextPage = data && data.length > pageSize;
  const pageData = hasNextPage ? data.slice(0, pageSize) : data;

  return { data: pageData, error, hasNextPage };
};
