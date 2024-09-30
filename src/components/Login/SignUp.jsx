import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import signup from "../../assets/signup.jpg";
import { useRegisterMutation } from "../../features/apiSlice";

const schema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name should be at least 2 characters long" }),
    middleName: z
      .string()
      .min(2, { message: "Middle name should be at least 2 characters long" }),
    lastName: z
      .string()
      .min(2, { message: "Last name should be at least 2 characters long" }),
    dateOfBirth: z.string(),
    email: z.string().email("This is not a valid email"),
    phone: z
      .string()
      .min(10, { message: "Phone number should be at least 10 digits long" })
      .max(15, { message: "Phone number should not exceed 15 digits" }),
    title: z.string().min(1, { message: "Title is required" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match",
    path: ["confirmPassword"],
  });

function Signup() {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const formattedData = {
      phone: data.phone,
      email: data.email,
      password: data.password,
      fname: data.firstName,
      mname: data.middleName || "",
      lname: data.lastName,
      dob: data.dateOfBirth,
      title: data.title || "",
    };

    try {
      await registerUser(formattedData).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-gray-100 hidden md:flex items-center justify-center relative">
        <img
          src={signup}
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        />
        <p className="absolute top-5 left-5 text-white text-4xl font-bold">
          Krishibharat
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          Sign Up to <span className="text-teal-700">KRISHIBHARAT</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          {/* Form fields... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700"
              >
                Middle Name
              </label>
              <input
                id="middleName"
                type="text"
                {...register("middleName")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <select
                id="title"
                {...register("title")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select your title
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {isError && (
              <p className="text-red-500 text-xs mt-2">
                {error.message || "An error occurred during registration"}
              </p>
            )}
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already Registered?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-teal-500 cursor-pointer hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
