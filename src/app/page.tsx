"use client";
import Admin from "./admin/admin";
import Customer from "./customer/customer";
import Info from "./loginInfo/Information";
export default function Home() {
  return (
    <>
      <div>
        {/* <Admin /> */}
        {/* <Customer /> */}
        <Info setIsLogin={() => {}} />
      </div>
    </>
  );
}
