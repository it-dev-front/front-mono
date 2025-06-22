import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

export default function WithGNBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
