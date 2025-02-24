import "./index.css";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import ModalProvider from "@/components/providers/ModalProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
const font = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Scrapmatic",
  description: "Webranch team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/profile">
        <body className={`bg-bodyGradient ${font.className} antialiased`}>
          {children}
          <ModalProvider />
          <ToastProvider />
        </body>
      </UserProvider>
    </html>
  );
}
