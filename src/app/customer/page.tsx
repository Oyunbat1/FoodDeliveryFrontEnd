"use client";
import React from "react";
import Header from "./components/homePage/header/Header";
import Category from "./components/homePage/category/Category";
import MenuContainer from "@/app/customer/components/homePage/menuContainer/MenuContainer";
import Footer from "./components/homePage/footer/Footer";
import Image from "next/image";
function Customer() {
  return (
    <div className="bg-gray-500 ">
      <Header />
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

export default Customer;
