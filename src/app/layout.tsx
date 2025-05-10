import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <ThemeProvider>
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
