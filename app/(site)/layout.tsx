import { Manrope } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/components/Providers/Reduxprovider";
import ScrollBar from "@/components/Extra/ScrollBar";
import ScrolltoTopBtn from "@/components/Extra/ScrolltoTopBtn";

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
    <ReduxProvider>
      <html lang="en">
        <body className={manRope.variable}>
          <ScrollBar/>
          {children}
          <ScrolltoTopBtn/>
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
