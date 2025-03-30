import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"]
});


export const metadata: Metadata = {
  title: "TaskPro",
  description: "Gerencie suas anotações.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
