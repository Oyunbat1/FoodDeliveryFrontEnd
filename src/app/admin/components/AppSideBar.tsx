"use client";

import { LayoutDashboard, Settings, Truck } from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type AppSidebarProps = {
  onNavigate: (page: string) => void;
  activePage: string;
};

const items = [
  {
    title: "FoodMenu",
    label: "Food menu",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    label: "Orders",
    icon: Truck,
  },
  {
    title: "Settings",
    label: "Settings",
    icon: Settings,
  },
];

export function AppSidebar({ onNavigate, activePage }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="bg-amber-300 flex flex-col items-center">
          <SidebarGroupLabel className="mt-[20px]">
            <div className="flex gap-2 items-center">
              <Image
                src={`/customer/logo.png`}
                width={45}
                height={20}
                alt="logo"
                className="h-[37.29px] w-[46px]"
              />
              <div className="text-white">
                <h1 className="text-[20px] font-[600]">
                  Nom <span className="text-red-600">Nom</span>
                </h1>
                <p className="text-[12px] font-[400]">Swift delivery</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-[40px] w-[165px]">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-2">
                  <SidebarMenuButton
                    className={`w-[165px] h-[40px] rounded-full pl-6 flex items-center gap-2
                    ${
                      activePage === item.title
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => onNavigate(item.title)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
