import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { StatusBarProvider } from "./context/StatusBarContext";
import StatusBar from "./components/StatusBar";

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
        <StatusBarProvider>
          <body
            className={`${roboto.className} antialiased bg-[var(--background)]`}
          >
            <StatusBar />
            {children}
          </body>{" "}
        </StatusBarProvider>
      </ThemeProvider>
    </html>
  );
}
