import React, { ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { motion } from "framer-motion";
import { ShoppingCart, User, MapPinHouse, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
function Header() {
  const router = useRouter();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleInSearch, setToggleInSearch] = useState(false);

  const HandleToggleSeach = () => {
    setToggleInSearch(false);
    setToggleSearch(false);
  };

  return (
    <motion.div
      // initial={{ opacity: 0, y: 100 }}
      // transition={{ duration: 100 }}
      // animate={{ opacity: 1, y: 0 }}
      className="fixed h-[80px] left-0 top-0 right-0 bg-black flex items-center justify-around gap-x-164 z-10"
    >
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
        {!toggleSearch && (
          <div
            onClick={() => {
              setToggleSearch(true);
            }}
            className="border border-white flex items-center  rounded-full px-4 cursor-pointer"
          >
            <MapPinHouse className="text-red-600 "></MapPinHouse>
            <label className="text-red-600 pl-2">Delivery address:</label>
            <Input
              className="w-[110px] h-[36px] text-white outline-0 border-0  focus-visible:ring-0 placeholder:text-gray-400"
              placeholder="Add Location"
            ></Input>{" "}
            <ChevronRight className="text-gray-400"></ChevronRight>
          </div>
        )}
        {toggleSearch && (
          <div className=" w-[318.63px] border border-white flex items-center gap-2 rounded-full px-4">
            <MapPinHouse className="text-red-600 "></MapPinHouse>
            <Input
              onClick={() => setToggleInSearch(true)}
              className="w-[151px] h-[36px] text-white outline-0 border-0 focus-visible:ring-0 placeholder:text-gray-400"
              placeholder="Add Location"
            ></Input>{" "}
            {toggleInSearch && (
              <X
                onClick={HandleToggleSeach}
                className="text-white w-[16px] ml-[80px]"
              ></X>
            )}
          </div>
        )}
        <Button className=" h-[36px] w-[36px bg-white flex justify-center items-center rounded-full text-black hover:bg-gray-200">
          <ShoppingCart></ShoppingCart>
        </Button>
        <Popover>
          <PopoverTrigger className="bg-red-600 hover:bg-red-400 w-[36px] h-[36px] flex justify-center items-center rounded-full">
            {" "}
            <User className="text-white"></User>
          </PopoverTrigger>
          <PopoverContent className="w-[188px] h-[104px] flex flex-col items-center gap-2">
            <h1>Test@gmail.com</h1>
            <Button className="w-[80px] h-[36px] rounded-full bg-[#F4F4F5] text-black hover:bg-gray-200">
              Sign out
            </Button>
          </PopoverContent>
        </Popover>

        {/* <Button
          className=" transition-all duration-200 bg-white text-black text-[14px] font-[400]  w-[75px] h-[36px] rounded-full hover:bg-gray-200"
          onClick={() => router.push("/customer/components/loginInfo/email")}
        >
          Sign up
        </Button>

        <Button className=" transition-all duration-200 bg-red-600 text-white text-[14px] font-[400] w-[75px] h-[36px] rounded-full hover:bg-red-400 ">
          Log in
        </Button> */}
      </div>
    </motion.div>
  );
}

export default Header;
