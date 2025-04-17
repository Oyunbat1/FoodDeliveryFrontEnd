"use client";
import React from "react";
import FoodMenu from "./components/FoodMenu";
import OrderInfo from "./components/OrderInfo";
import Settings from "./components/Settings";
import { AppSidebar } from "./components/AppSideBar";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
function Admin() {
  const [activePage, setActivePage] = useState("FoodMenu");

  const renderPage = () => {
    switch (activePage) {
      case "FoodMenu":
        return <FoodMenu />;
      case "Orders":
        return <OrderInfo />;
      case "Settings":
        return <Settings />;
      default:
        return <FoodMenu />;
    }
  };
  return (
    <div>
      <SidebarProvider className="w-[320px] ">
        <div className="flex">
          <AppSidebar onNavigate={setActivePage} activePage={activePage} />
          <main className="w-full">{renderPage()}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Admin;
