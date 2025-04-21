import { Header } from "@/widgets/Header";
import { UserSearchForm } from "@/widgets/UserSearchForm";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="pt-40 flex justify-center">
        <UserSearchForm />
      </div>
    </div>
  );
};
