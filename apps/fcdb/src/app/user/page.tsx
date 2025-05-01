import { User } from "@/views/User";

interface UserPageProps {
  searchParams: {
    name: string;
  };
}

const MOCK_OUID = "99156cc13fbdadffb8c87df57f12f3ad;";

export default async function UserPage({ searchParams }: UserPageProps) {
  const { name } = await searchParams;
  // ouid 가져오기 API 테스트
  const url = `https://open.api.nexon.com/fconline/v1/id?nickname=${name}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-nxopen-api-key": process.env.DEV_API_KEY as string,
    },
  });
  const ouid = await res.json();
  console.log(ouid);

  return (
    <div>
      <User name={name} />
    </div>
  );
}
