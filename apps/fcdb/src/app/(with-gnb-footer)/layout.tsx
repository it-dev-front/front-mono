import { Navigation } from "@/widgets/navigation";
import { Footer } from "@/widgets/Footer";

export default function WithGNBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
