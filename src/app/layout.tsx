import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Drawer from "./components/Drawer";
import AddTaskInput from "./components/AddTaskInput";
import Title from "./components/Title";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${roboto.className} ${roboto.className} antialiased`}>
        <div className="h-screen w-screen flex ">
          <Drawer />
          <div className="w-full flex flex-col  bg-gray-100 px-4">
            <Title />
            <AddTaskInput />
            <section>{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
