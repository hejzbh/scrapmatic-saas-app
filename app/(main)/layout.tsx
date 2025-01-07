import Header from "@/features/(app)/(navigation)/components/Header";
import Sidebar from "@/features/(app)/(navigation)/components/Sidebar";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar className="hidden lg:block" />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <div className="overflow-auto h-full">
          <main className="flex-1 px-4 md:px-10 h-full py-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
