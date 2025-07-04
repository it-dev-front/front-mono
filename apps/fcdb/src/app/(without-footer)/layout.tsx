export default function WithoutFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
