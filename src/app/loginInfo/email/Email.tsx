"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InfoType from "@/app/customer/types/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      role: "",
    };

    const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.email) {
      errors.email = "Майл хаягаа оруулна уу";
    } else if (!emailRegexPattern.test(formValues.email)) {
      errors.email = "Майл хаяг буруу байна";
    }
    setFormErrors(errors);

    if (errors.email) return;
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
            <Select
              onValueChange={(value) =>
                setFormValues((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-[336px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-[20px] flex flex-col gap-2">
              {" "}
              <Button onClick={() => {}} type="submit">
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
