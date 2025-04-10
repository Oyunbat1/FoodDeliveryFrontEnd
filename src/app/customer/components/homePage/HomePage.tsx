"use client";
import React from "react";
import Header from "./header/Header";
import Category from "./category/category";
import MenuContainer from "@/app/customer/components/homePage/menuContainer/MenuContainer";
import Footer from "./footer/Footer";
import Image from "next/image";
function HomePage() {
  return (
    <div className="bg-gray-500 ">
      <Header></Header>
      <Image
        src={`/customer/section-1.png`}
        alt="section-1"
        width={1440}
        height={570}
        className="w-screen overflow-y-hidden h-[570px] mt-[62px]"
      ></Image>
      <Category></Category>
      <MenuContainer></MenuContainer>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
