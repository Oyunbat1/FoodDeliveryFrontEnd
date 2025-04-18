"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import InfoType from "@/app/customer/types/index";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "@/constants";
interface PasswordSectionProps {
  formValues: InfoType;
  formErrors: InfoType;
  setFormValues: React.Dispatch<React.SetStateAction<InfoType>>;
  setFormErrors: React.Dispatch<React.SetStateAction<InfoType>>;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  email: string;
  role: string;
}

const Password: React.FC<PasswordSectionProps> = ({
  formValues,
  formErrors,
  setFormValues,
  setFormErrors,
  nextStep,
  prevStep,
  email,
  role,
}: PasswordSectionProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setPassword(event.target.value);
    setConfirmPassword(event.target.value);
  };
  const onSubmit = async () => {
    const user = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password,
      role,
    });
    console.log(user, "user");
    console.log("send request");
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

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    if (!formValues.password) {
      errors.password = "Та нууц үгээ оруулна уу.";
    } else if (formValues.password.length < 8) {
      errors.password = "Нууц үг 8-аас дээш тэмдэгттэй байх ёстой.";
    } else if (!passwordRegex.test(formValues.password)) {
      errors.password = "Нууц үг нь том, жижиг үсэг, тоо агуулсан байх ёстой.";
    }
    if (!formValues.confirmpassword) {
      errors.confirmpassword = "Та нууц үгээ дахин оруулна уу.";
    } else if (formValues.password != formValues.confirmpassword) {
      errors.confirmpassword = "Пасспорт таарахгүй байна.";
    }

    setFormErrors(errors);

    if (errors.password || errors.confirmpassword) return;
    nextStep();
    onSubmit();
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] h-screen items-center">
      <div className="flex justify-center items-center h-full">
        <form onSubmit={Handle}>
          <div className="w-[416px] p-[40px] flex flex-col gap-6 relative">
            <div>
              <Button className="bg-white border text-black" onClick={prevStep}>
                <ChevronLeft />
              </Button>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[24px] font-[600]">
                Create a strong password
              </h1>
              <p className="text-[16px] text-gray-400">
                Create a strong password with letters, numbers.
              </p>
            </div>
            <div>
              {" "}
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${
                  formErrors.password
                    ? "border border-red-600"
                    : "focus-visible:ring-0 focus-visible:border-blue-600 hover:border-blue-200 hover:transition-all hover:duration-100 "
                }`}
                placeholder="Password"
                onChange={OnChange}
                value={formValues.password}
              />
              {formErrors.password && (
                <p className="text-red-600 text-[12px] font-[400] absolute bottom-[240px] ml-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="mt-[10px]">
              {" "}
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                className={`${
                  formErrors.confirmpassword
                    ? "border border-red-600"
                    : "focus-visible:ring-0 focus-visible:border-blue-600 hover:border-blue-200 hover:transition-all hover:duration-100 "
                }`}
                placeholder="Confirm Password"
                onChange={OnChange}
                value={formValues.confirmpassword}
              />
              {formErrors.confirmpassword && (
                <p className="text-red-600 text-[12px] font-[400] absolute bottom-[170px] ml-1">
                  {formErrors.confirmpassword}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
                className="w-[16px]  cursor-pointer peer 
             checked:bg-gray-500 checked:border-gray-500"
              ></Input>
              <label className="text-[14px] text-gray-600">Show password</label>
            </div>
            <div className="] flex flex-col gap-2">
              {" "}
              <Button
                className="transition-all duration-400  bg-gray-300 border text-white hover:bg-black "
                type="submit"
              >
                Let's go
              </Button>
              <div className="flex gap-1 justify-center">
                <p className="text-[16px] text-gray-304 font-[400]">
                  Already have an account?
                </p>
                <p className="text-[16px] font-[400] text-blue-500">Log in</p>
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

export default Password;
