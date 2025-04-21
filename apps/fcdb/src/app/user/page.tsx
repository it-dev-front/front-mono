import { User } from "@/views/User";

interface UserPageProps {
  searchParams: {
    name?: string;
  };
}

export default function UserPage({ searchParams }: UserPageProps) {
  const name = searchParams.name ?? "";

  return (
    <div>
      <User name={name} />
    </div>
  );
}
