"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import InfoType from "@/app/customer/types/index";

interface EmailSectionProps {
  formValues: InfoType;
  formErrors: InfoType;
  setFormValues: React.Dispatch<React.SetStateAction<InfoType>>;
  setFormErrors: React.Dispatch<React.SetStateAction<InfoType>>;
  nextStep: () => void;
  currentStep: number;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  formValues,
  formErrors,
  setFormValues,
  setFormErrors,
  nextStep,
  currentStep,
}: EmailSectionProps) => {
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

    if (Object.keys(errors).length > 0) {
      return;
    }
    nextStep();
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] h-screen items-center">
      <div className="flex justify-center items-center h-full">
        <form onSubmit={Handle}>
          <div className="w-[416px] p-[40px] flex flex-col gap-6 relative">
            <div className="flex flex-col">
              <h1 className="text-[24px] font-[600]">Create your account</h1>
              <p className="text-[16px] text-gray-400">
                Sign up to explore your favorite dishes.
              </p>
            </div>
            <Input
              type="email"
              name="email"
              className={`${
                formErrors.email
                  ? "border border-red-600"
                  : "focus-visible:ring-0 focus-visible:border-blue-600 hover:border-blue-200 hover:transition-all hover:duration-100 "
              }`}
              placeholder="Email"
              onChange={OnChange}
              value={formValues.email}
            />
            {formErrors.email && (
              <p className="text-red-600 text-[12px] font-[400] absolute bottom-[130px] ml-1">
                {formErrors.email}
              </p>
            )}
            <div className="mt-[20px] flex flex-col gap-2">
              {" "}
              <Button
                onClick={nextStep}
                className="transition-all duration-400  bg-gray-300 border text-white hover:bg-black "
                type="submit"
              >
                Let's go
              </Button>
              <div className="flex gap-1 justify-center">
                <p className="text-[16px] text-gray-304 font-[400]">
                  Already have an account?
                </p>
                <p className="text-[16px] font-[400] text-blue-500 cursor-pointer">
                  Log in
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
  );
};

export default EmailSection;
