import { Header } from "@/widgets/Header";
import { UserInformation } from "@/widgets/UserInformation";

interface UserPageProps {
  name: string;
}

export const User = ({ name }: UserPageProps) => {
  return (
    <div>
      <Header />
      <div className="pt-4 flex justify-center">
        <div>
          <UserInformation />
          <p className="pt-4">{name}</p>
        </div>
      </div>
    </div>
  );
};
