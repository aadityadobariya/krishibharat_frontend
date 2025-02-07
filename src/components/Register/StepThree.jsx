import { useFormContext } from "react-hook-form";

const StepThree = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Bank Details
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Enter your bank details.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="ifscCode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            IFSC Code
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="ifscCode"
              {...register("ifscCode")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.ifscCode?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.ifscCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="accHolderName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Account Holder Name as per Bank A/C
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="accHolderName"
              {...register("accHolderName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.accHolderName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.accHolderName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="bankName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bank Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="bankName"
              {...register("bankName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.bankName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.bankName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="bankAccNo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bank Account No.
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="bankAccNo"
              {...register("bankAccNo")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.bankAccNo?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.bankAccNo.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="branchName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Branch Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="branchName"
              {...register("branchName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.branchName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.branchName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="confirmAccNo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Account No.
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="confirmAccNo"
              {...register("confirmAccNo")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.confirmAccNo?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.confirmAccNo.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-full">
          <label
            htmlFor="branchAddress"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Branch Address
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="branchAddress"
              {...register("branchAddress")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.branchAddress?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.branchAddress.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-full">
          <label
            htmlFor="copyOfPassbook"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload copy of Passbook
          </label>
          <div className="mt-2">
            <input
              type="file"
              id="copyOfPassbook"
              {...register("copyOfPassbook")}
              onChange={(e) => (e, "copyOfPassbook")}
            />
            {errors.copyOfPassbook?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.copyOfPassbook.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-full">
          <label
            htmlFor="kycImage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload copy of KYC
          </label>
          <div className="mt-2">
            <input type="file" id="kycImage" {...register("kycImage")} />
            {errors.kycImage?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.kycImage.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepThree;
