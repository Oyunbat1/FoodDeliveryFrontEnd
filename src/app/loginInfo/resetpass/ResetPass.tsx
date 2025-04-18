"use client";
import React from "react";
import InfoType from "@/app/customer/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface ResetSectionProps {
  formValues: InfoType;
  formErrors: InfoType;
  setFormValues: React.Dispatch<React.SetStateAction<InfoType>>;
  setFormErrors: React.Dispatch<React.SetStateAction<InfoType>>;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
}

const ResetPass: React.FC<ResetSectionProps> = ({
  formValues,
  formErrors,
  setFormValues,
  setFormErrors,
  nextStep,
  prevStep,
  currentStep,
}: ResetSectionProps) => {
  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const Handle = (event: React.FormEvent) => {
    event.preventDefault();
    let errors: InfoType = {
      email: "",
      password: "",
      confirmpassword: "",
      showpassword: false,
    };

    const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      errors.email = "Please provide a valid email address.";
    } else if (!emailRegexPattern.test(formValues.email)) {
      errors.email = "Please provide a valid email address.";
    }

    setFormErrors(errors);

    if (!formValues.email) {
      return;
    }
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] h-screen items-center">
        <div className="flex justify-center items-center h-full">
          <form onSubmit={Handle}>
            <div className="w-[416px] p-[40px] flex flex-col gap-6 relative">
              <div>
                <Button
                  className="bg-white border text-black"
                  onClick={prevStep}
                >
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
                  type="email"
                  name="email"
                  className={`${
                    formErrors?.email
                      ? "border border-red-600"
                      : "focus-visible:ring-0 focus-visible:border-blue-600 hover:border-blue-200 hover:transition-all hover:duration-100 "
                  }`}
                  placeholder="Email"
                  onChange={OnChange}
                  value={formValues.email}
                />
                {formErrors?.email && (
                  <p className="text-red-600 text-[12px] font-[400] mt-1 ml-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="] flex flex-col gap-2">
                {" "}
                <Button
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
