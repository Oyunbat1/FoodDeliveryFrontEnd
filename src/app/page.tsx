"use client";
import { useState, useEffect } from "react";
import Information from "./customer/components/loginInfo/Information";
import HomePage from "./customer/components/homePage/HomePage";
import BASE_URL from "@/constants";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div>
        {!isLogin && <Information setIsLogin={setIsLogin}></Information>}
        {isLogin && <HomePage></HomePage>}
      </div>
    </>
  );
}
