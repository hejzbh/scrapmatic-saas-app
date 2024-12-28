import Header from "@/features/(main)/(navigation)/components/Header";
import Sidebar from "@/features/(main)/(navigation)/components/Sidebar";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />đ
        <div className="overflow-auto">
          <main className="flex-1 container py-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
