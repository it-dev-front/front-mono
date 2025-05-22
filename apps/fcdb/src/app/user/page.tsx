import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { User } from "@/views/User";

interface UserPageProps {
  searchParams: {
    name: string;
  };
}

const MOCK_OUID = "99156cc13fbdadffb8c87df57f12f3ad;";

export default async function UserPage({ searchParams }: UserPageProps) {
  const { name } = await searchParams;
  let ouid = "";

  try {
    const result = await FcClient.get("User").then((api) => api.getOuid(name));
    if (result.ouid) {
      ouid = result.ouid;
    }
    return <User ouid={ouid} />;
  } catch (e) {
    // 존재하지 않는 값
    console.error(e);
  }

  return (
    <div>
      <User ouid={ouid} />
    </div>
  );
}
