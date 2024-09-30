import { useFormContext } from "react-hook-form";

const StepOne = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Registration
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Enter personal details.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="registrationType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Registration Type
          </label>
          <div className="mt-2">
            <select
              name="registrationType"
              id="registrationType"
              {...register("registrationType")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 appearance-none"
            >
              <option value="" disabled>
                Select registration type
              </option>
              <option value="farmer">Farmer</option>
              <option value="merchant">Merchant</option>
            </select>
            {errors.registrationType?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.registrationType.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3"></div>

        <div className="sm:col-span-3">
          <label
            htmlFor="registrationLevel"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Registration Level
          </label>
          <div className="mt-2">
            <input
              type="radio"
              id="state"
              value="state"
              name="registrationLevel"
              {...register("registrationLevel")}
            />
            <label htmlFor="state" className="p-3">
              State
            </label>
            <input
              type="radio"
              id="mandi"
              value="mandi"
              name="registrationLevel"
              {...register("registrationLevel")}
            />
            <label htmlFor="mandi" className="p-3">
              Mandi
            </label>
            {errors.registrationLevel?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.registrationLevel.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
