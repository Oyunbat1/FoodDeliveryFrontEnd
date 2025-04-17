"use client";
import React, { useEffect, useState } from "react";
import EmailSection from "./email/Email";
import Password from "./password/Password";
import InfoType from "@/app/customer/types/index";
import Login from "./login/Login";

const Info: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [formValues, setFormValues] = useState<InfoType>({
    email: "",
    password: "",
    confirmpassword: "",
    showpassword: false,
    role: "",
  });
  useEffect(() => {
    setEmail(formValues.email);
    setRole(formValues.role);
    setPassword(formValues.password);
  }, [formValues.email, formValues.role, formValues.password]);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    showpassword: false,
    role: "",
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
          email={email}
          role={role}
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
          email={email}
          password={password}
          role={role}
        />
      )}
    </div>
  );
};

export default Info;
