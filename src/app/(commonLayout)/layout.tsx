import { Footer2 } from "@/components/Home/footer/footer2";
import { Navbar1 } from "@/components/shared/navbar/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar1 />
      <main className="flex-1">{children}</main>
      <Footer2 />
    </div>
  );
};

export default CommonLayout;
