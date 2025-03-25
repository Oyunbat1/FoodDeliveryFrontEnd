"use client";
import React, { useEffect, useState } from "react";
import EmailSection from "./email/Email";
import Password from "./password/Password";
import InfoType from "@/app/customer/types/index";
import Login from "./login/Login";
const Info: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    if (currentStep === 2) {
      window.localStorage.removeItem("food-delivery");
    } else {
      window.localStorage.setItem(
        "food-delivery",
        JSON.stringify({ formValues, currentStep: currentStep + 1 })
      );
    }
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    const savedData = window.localStorage.getItem("food-delivery");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData?.formValues && parsedData?.currentStep !== undefined) {
          setFormValues(parsedData.formValues);
          setCurrentStep(parsedData.currentStep);
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
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
        />
      )}
    </div>
  );
};

export default Info;
