import { type NextRequest } from "next/server";
const cheerio = require("cheerio");
import { supabase } from "@/shared/utils/supabase";

export async function GET() {
  // 페이지당 20개씩 100위까지 가져오기
  const pageNumbers = [1, 2, 3, 4, 5];

  const fetchPageData = async (pageNo: number) => {
    const response = await fetch(
      `https://fconline.nexon.com/datacenter/rank_inner?n4seasonno=0&n4pageno=${pageNo}&tc_01=0&tc_02=0&tc_l_01=0&tc_l_02=0&tc_c_01=0&tc_c_02=0&tc_01_cnt_s=1&tc_01_cnt_e=11&tc_02_cnt_s=1&tc_02_cnt_e=11&formation_01=-&formation_02=-&cv_s=0&cv_e=1000000000000000000&tier_s=3100&tier_e=800&rank_s=1&rank_e=100`
    );

    if (!response.ok) {
      console.error(
        `Fetch failed for page ${pageNo} with status ${response.status}`
      );
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const pageData = $("div.tr")
      .map((index: number, element: Element) => {
        const $element = $(element);

        const rankNo = Number($element.find("span.td.rank_no").text().trim());

        if (!rankNo) {
          return null;
        }

        const nickname = $element
          .find("span.td.rank_coach span.coach_wrap span.name.profile_pointer")
          .text()
          .trim();
        const clubValue = $element
          .find("span.td.rank_coach span.price")
          .text()
          .trim();
        const level = Number(
          $element
            .find("span.td.rank_coach span.coach_wrap span.lv span.txt")
            .text()
            .trim()
        );
        const rankingScore = Number(
          $element.find("span.td.rank_r_win_point").text().trim()
        );
        const rankBestImg = $element
          .find("span.td.rank_best span.ico_rank")
          .last()
          .find("img")
          .attr("src");

        const recordText = $element.find("span.td.rank_before").text().trim();
        const oddsMatch = recordText.match(/^(\d+(\.\d+)?)%/);
        const recordMatch = recordText.match(/(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)/);

        const win = recordMatch ? Number(recordMatch[1]) : 0;
        const draw = recordMatch ? Number(recordMatch[2]) : 0;
        const lose = recordMatch ? Number(recordMatch[3]) : 0;
        const odds = oddsMatch ? Number(oddsMatch[1]) : "";

        if (!rankNo) {
          return null;
        }

        return {
          rankNo,
          nickname,
          clubValue,
          level,
          rankingScore,
          record: { win, draw, lose },
          odds,
          rankBestImg,
        };
      })
      .get()
      .filter(Boolean);

    return pageData;
  };

  // 병렬로 페이지 데이터 모두 가져오기
  const allPageResults = await Promise.all(pageNumbers.map(fetchPageData));

  // 2차원 배열을 1차원으로 합치기
  const combinedData = allPageResults.flat();

  // Supabase upsert
  const { error } = await supabase
    .from("ranking")
    .upsert(combinedData, { onConflict: "rankNo" })
    .select();

  if (error) {
    console.log("Error upserting data:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ status: 200 });
}
