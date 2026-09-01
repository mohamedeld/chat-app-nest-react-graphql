import { Outlet } from "react-router";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
