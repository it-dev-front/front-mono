import { type NextRequest } from "next/server";
const cheerio = require("cheerio");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNo = searchParams.get("pageNo");

  const response = await fetch(
    `https://fconline.nexon.com/datacenter/rank_inner?n4seasonno=0&n4pageno=${pageNo}&tc_01=0&tc_02=0&tc_l_01=0&tc_l_02=0&tc_c_01=0&tc_c_02=0&tc_01_cnt_s=1&tc_01_cnt_e=11&tc_02_cnt_s=1&tc_02_cnt_e=11&formation_01=-&formation_02=-&cv_s=0&cv_e=1000000000000000000&tier_s=3100&tier_e=800&rank_s=1&rank_e=100`
  );

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const data = $("div.tr")
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

  return Response.json(data);
}
