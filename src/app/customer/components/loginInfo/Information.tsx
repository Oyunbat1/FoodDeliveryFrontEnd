"use client";
import React, { useEffect, useState } from "react";
import EmailSection from "./email/EmailSection";
import Password from "./password/Password";
import InfoType from "@/app/customer/types/index";
import Login from "./login/Login";
interface InfoProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Info: React.FC<InfoProps> = ({ setIsLogin }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [formValues, setFormValues] = useState<InfoType>({
    email: "",
    password: "",
    confirmpassword: "",
    showpassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    showpassword: false,
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div>
      {currentStep === 0 && (
        <EmailSection
          formValues={formValues}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          nextStep={nextStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 1 && (
        <Password
          formValues={formValues}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          nextStep={nextStep}
          currentStep={currentStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 2 && (
        <Login
          formValues={formValues}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          nextStep={nextStep}
          currentStep={currentStep}
          prevStep={prevStep}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
};

export default Info;
