import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import signup from "../../assets/signup.jpg";
import { useLoginMutation } from "../../features/apiSlice";
import { setToken } from "../../features/authSlice";

const schema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(2, { message: "Password is required" }),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      const { token, user_type } = response;

      dispatch(setToken(token));
      console.log(token);

      if (user_type === "farmer") {
        navigate("/farmer-dashboard");
      } else if (user_type === "merchant") {
        navigate("/merchant-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex flex-col items-center justify-center bg-white hidden md:block">
        <img
          src={signup}
          alt="Ayurvedic Audiobook Illustration"
          className="relative h-full w-full object-cover"
        />
        <p className="absolute top-5 left-5 text-white text-4xl font-bold">
          Krishibharat
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-14">
          Login to <span className="text-teal-700">KRISHIBHARAT</span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xs md:max-w-sm"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
            {isError && (
              <p className="text-red-500 text-xs mt-2">
                {error.message || "An error occurred during login"}
              </p>
            )}
          </div>
        </form>
        <div className="text-center">
          <p className="mt-4 text-sm">
            Not Registered?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-teal-500 cursor-pointer hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
