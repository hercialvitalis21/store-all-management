import { Suspense } from "react";

import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar
        fullName="Store User"
        avatar="/assets/images/avatar.png"
        email="you@storeit.app"
      />

      <section className="flex h-full flex-1 flex-col">
        <header className="header">
          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </header>
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
