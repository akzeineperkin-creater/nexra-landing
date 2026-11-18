import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexra — Инвестициялық симулятор | Ғылыми жоба",
  description:
    "Қаржылық сауаттылықты дамытатын виртуалды платформа. Автор: Еркін Ақзейнеп, 11 сынып.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className="light">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
