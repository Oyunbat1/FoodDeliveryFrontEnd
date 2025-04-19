"use client";
import React, { useRef } from "react";
import InfoType from "@/app/customer/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import BASE_URL from "@/constants";
import { toast } from "sonner";
import axios from "axios";

const ResetPass = () => {
  const ref = useRef<HTMLInputElement>(null);
  const resetPassword = async () => {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      userEmail: ref.current?.value || "",
    });
    toast("Email successfully sent");
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] h-screen items-center">
        <div className="flex justify-center items-center h-full">
          <form>
            <div className="w-[416px] p-[40px] flex flex-col gap-6 relative">
              <div>
                <Button className="bg-white border text-black">
                  <ChevronLeft />
                </Button>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[24px] font-[600]">Reset your password </h1>
                <p className="text-[16px] text-gray-400">
                  Enter your email to receive a password reset link.
                </p>
              </div>

              <div>
                {" "}
                <Input
                  ref={ref}
                  type="email"
                  name="email"
                  className="focus-visible:ring-0 focus-visible:border-blue-600 hover:border-blue-200 hover:transition-all hover:duration-100 "
                  placeholder="Email"
                />
              </div>
              <div className="] flex flex-col gap-2">
                {" "}
                <Button
                  onClick={resetPassword}
                  className="transition-all duration-400  bg-gray-300 border text-white hover:bg-black "
                  type="submit"
                >
                  Send link
                </Button>
                <div className="flex gap-1 justify-center">
                  <p className="text-[16px] text-gray-304 font-[400]">
                    Don't have an account?
                  </p>
                  <p className="text-[16px] font-[400] text-blue-500">
                    Sign up
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-[10px] h-full">
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              src={"/customer/bgOfLogin.jpeg"}
              width={340}
              height={840}
              alt="bgoflogin"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
