"use client";
import React from "react";
import InfoType from "@/app/customer/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BASE_URL from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface LoginSectionProps {
  formValues: InfoType;
  formErrors: InfoType;
  setFormValues: React.Dispatch<React.SetStateAction<InfoType>>;
  setFormErrors: React.Dispatch<React.SetStateAction<InfoType>>;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  email: string;
  password: string;
  role: string;
}

interface DecodedToken {
  user: {
    role: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const Login: React.FC<LoginSectionProps> = ({
  formValues,
  formErrors,
  setFormValues,
  setFormErrors,
  prevStep,
  email,
  password,
  role,
}: LoginSectionProps) => {
  const router = useRouter();
  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = async () => {
    const user = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
      role,
    });
    const token = user.data?.token;
    if (!token) return console.error("No token received");
    localStorage.setItem("token", token);
    const decoded = jwtDecode<DecodedToken>(token);
    console.log(user, "user");

    const checkRole = decoded?.user?.role;

    if (checkRole === "ADMIN") {
      router.push("/admin");
    } else if (role === "USER") {
      router.push("/customer");
    } else {
      console.warn("Unknown role:", checkRole);
    }
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
      errors.email = "Email is required";
    } else if (!emailRegexPattern.test(formValues.email)) {
      errors.email = "Email is invalid";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    if (errors.password || errors.email) {
      return;
    }
    onSubmit();
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
                <h1 className="text-[24px] font-[600]">Log in</h1>
                <p className="text-[16px] text-gray-400">
                  Log in to enjoy your favorite dishes.
                </p>
              </div>

              <div>
                {" "}
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
                  <p className="text-red-600 text-[12px] font-[400] mt-1 ml-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mt-[10px] pb-[16px]">
                {" "}
                <Input
                  type={"password"}
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
                  <p className="text-red-600 text-[12px] font-[400]  bottom-[126px] ml-1 mt-1">
                    {formErrors.password}
                  </p>
                )}
                <Link href="/customer/components/loginInfo/resetpass">
                  {" "}
                  <p className="underline text-[14px] text-gray-600 mt-1">
                    Forgot password ?
                  </p>
                </Link>
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

export default Login;
