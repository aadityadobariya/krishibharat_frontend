import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useFetchProfileQuery,
  useUpdateUserMutation,
} from "../../features/apiSlice";
import { FormDataSchema } from "./schema";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const steps = [
  {
    id: "Step 1",
    name: "Registration",
    fields: ["registrationType", "registrationLevel"],
  },
  {
    id: "Step 2",
    name: "Personal Details",
    fields: [
      "title",
      "firstName",
      "middleName",
      "lastName",
      "gender",
      "dateOfBirth",
      "relationType",
      "relationName",
      "residentialAddress",
      "pincode",
      "state",
      "district",
      "tehsil",
      "city",
      "photoIdType",
      "photoIdNumber",
      "mobileNo",
      "email",
      "licenceNo",
    ],
  },
  {
    id: "Step 3",
    name: "Bank Details",
    fields: [
      "ifscCode",
      "accHolderName",
      "bankName",
      "bankAccNo",
      "branchName",
      "confirmAccNo",
      "copyOfPassbook",
      "kycImage",
    ],
  },
  { id: "Step 4", name: "Completed" },
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const methods = useForm({
    resolver: zodResolver(FormDataSchema),
  });

  const { handleSubmit, trigger, setValue, formState } = methods;

  const { data: profileData, isSuccess } = useFetchProfileQuery();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess && profileData) {
      const { user_info, bank } = profileData;

      setValue("registrationType", user_info.user_type || "");
      setValue("registrationLevel", user_info.registrationLevel || "");
      setValue("title", user_info.title || "");
      setValue("firstName", user_info.fname || "");
      setValue("middleName", user_info.mname || "");
      setValue("lastName", user_info.lname || "");
      setValue("gender", user_info.gender || "");
      setValue("dateOfBirth", user_info.dob || "");
      setValue("relationType", user_info.nomini_type || "");
      setValue("relationName", user_info.nomini_name || "");
      setValue("residentialAddress", user_info.address || "");
      setValue("pincode", user_info.pincode || "");
      setValue("state", user_info.state || "");
      setValue("district", user_info.district || "");
      setValue("tehsil", user_info.village || "");
      setValue("city", user_info.city || "");
      setValue("photoIdType", user_info.photoIdType || "");
      setValue("photoIdNumber", user_info.photoIdNumber || "");
      setValue("mobileNo", user_info.mobileNo || "");
      setValue("email", user_info.email || "");
      setValue("licenceNo", user_info.lic_no || "");
      setValue("ifscCode", bank.ifsc || "");
      setValue("accHolderName", bank.ac_name || "");
      setValue("bankName", bank.bankName || "");
      setValue("bankAccNo", bank.ac_no || "");
      setValue("branchName", bank.branch_name || "");
      setValue("confirmAccNo", bank.confirmAccNo || "");
      setValue("copyOfPassbook", bank.copyOfPassbook || "");
      setValue("kycImage", bank.kycImage || "");
    }
  }, [profileData, isSuccess, setValue]);

  const processForm = async (data) => {
    try {
      const formattedData = {
        user_info: {
          user_type: data.registrationType || "",
          title: data.title || "",
          fname: data.firstName || "",
          mname: data.middleName || "",
          lname: data.lastName || "",
          gender: data.gender || "",
          dob: data.dateOfBirth || "",
          nomini_type: data.relationType || "",
          nomini_name: data.relationName || "",
          address: data.residentialAddress || "",
          pincode: data.pincode || "",
          state: data.state || "",
          district: data.district || "",
          village: data.tehsil || "",
          lic_no: data.licenceNo || "",
          created_by: null,
          created_at: new Date().toISOString(),
          modified_at: null,
          completion_status: 1,
        },
        bank: {
          ac_no: data.bankAccNo || "",
          ac_name: data.accHolderName || "",
          ifsc: data.ifscCode || "",
          branch_name: data.branchName || "",
        },
        kyc: {
          doc_type: "Aadhar",
          created_at: new Date().toISOString(),
        },
      };

      console.log("Sending data to API:", formattedData);
      const response = await updateUser(formattedData).unwrap();
      console.log("Update successful:", response);
      navigate("/farmer-dashboard"); // Adjust the path as needed
    } catch (error) {
      console.error("Update failed:", error);
      if (error.data) {
        console.error("Error details:", error.data);
      }
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;

    const isValid = await trigger(fields, { shouldFocus: true });

    if (!isValid) {
      console.log("Validation errors:", formState.errors);
      return;
    }

    if (currentStep === steps.length - 2) {
      await handleSubmit(processForm)();
    } else if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      case 3:
        return (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="absolute inset-0 flex flex-col justify-between p-24">
        <nav aria-label="Progress">
          <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-teal-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-teal-600 transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-teal-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-teal-600">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStepContent()}
          </motion.div>
        </form>

        <div className="mt-8 pt-5">
          <div className="flex justify-between mb-9">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </FormProvider>
  );
}
