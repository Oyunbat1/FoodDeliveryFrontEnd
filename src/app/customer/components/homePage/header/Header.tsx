import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Header() {
  const router = useRouter();
  return (
    <div className="fixed h-[60px] left-0 top-0 right-0 bg-black flex items-center justify-around gap-x-164 z-10">
      <div className="flex gap-2 items-center">
        <Image
          src={`/customer/logo.png`}
          width={45}
          height={20}
          alt="logo"
          className="h-[37.29px] w-[46px]"
        ></Image>
        <div className="text-white">
          <h1 className="text-[20px] font-[600]">
            Nom <span className="text-red-600">Nom</span>
          </h1>
          <p className="text-[12px] font-[400]">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className=" transition-all duration-200 bg-white text-black text-[14px] font-[400]  w-[75px] h-[36px] rounded-full hover:bg-gray-200"
          onClick={() => router.push("/customer/components/loginInfo/email")}
        >
          Sign up
        </Button>

        <Button className=" transition-all duration-200 bg-red-600 text-white text-[14px] font-[400] w-[75px] h-[36px] rounded-full hover:bg-red-400 ">
          Log in
        </Button>
      </div>
    </div>
  );
}

export default Header;
