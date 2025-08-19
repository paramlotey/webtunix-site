import { Manrope } from "next/font/google";
import "../../globals.css";

const manRope = Manrope({
  variable: "--font-man-rope",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={manRope.variable}>
      <div>{children}</div>
    </section>
  );
}
