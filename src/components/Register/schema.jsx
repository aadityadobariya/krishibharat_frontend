import { z } from "zod";
export const FormDataSchema = z
  .object({
    registrationType: z
      .string()
      .min(1, { message: "Registration type is required" }),
    registrationLevel: z.enum(["state", "mandi"], {
      errorMap: () => ({
        message: "Please select a valid registration level.",
      }),
    }),
    title: z.string().min(1, { message: "Title is required" }),
    firstName: z.string().min(1, "First Name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last Name is required"),
    gender: z.string().min(2, { message: "Gender is required" }),
    dateOfBirth: z.string().optional(),
    relationType: z.string().min(1, { message: "Relation type is required" }),
    relationName: z.string().optional(),
    residentialAddress: z.string().min(1, "Address is required"),
    pincode: z.string().min(6, "Pincode should be at least 6 characters"),
    state: z.string().optional(),
    district: z.string().optional(),
    tehsil: z.string().optional(),
    city: z.string().optional(),
    photoIdType: z.string().min(1, { message: "Photo ID Type is required" }),
    photoIdNumber: z.string().optional(),
    mobileNo: z.string().min(10, "Mobile No should be at least 10 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    licence: z.string().optional(),
    ifscCode: z.string().min(5, "IFSC code is required"),
    accHolderName: z.string().min(5, "Please enter account holder's name"),
    bankName: z.string().min(2, "Please enter a valid Bank's name"),
    bankAccNo: z.string(),
    branchName: z.string().min(2, "Please enter a branch name"),
    confirmAccNo: z.string(),
    branchAddress: z.string().min(1, "Branch Address is required"),
    copyOfPassbook: z.any(),
    kycImage: z.any(),
  })
  .refine((data) => data.bankAccNo === data.confirmAccNo, {
    message: "Account Numbers don't match",
    path: ["confirmAccNo"],
  });
