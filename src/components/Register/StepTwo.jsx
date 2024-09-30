import { useFormContext } from "react-hook-form";

const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Details
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Enter your personal details.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <select
              name="title"
              id="title"
              {...register("title")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 appearance-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                -Select your title-
              </option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
            {errors.title?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.firstName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="middleName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Middle Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="middleName"
              {...register("middleName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.middleName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.middleName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.lastName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Gender
          </label>
          <div className="mt-2">
            <select
              name="gender"
              id="gender"
              {...register("gender")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 appearance-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                -Select your gender-
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date of Birth
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.dateOfBirth?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="relationType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Relation Type
          </label>
          <div className="mt-2">
            <select
              name="relationType"
              id="relationType"
              {...register("relationType")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 appearance-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                -Select relation type-
              </option>
              <option value="Son Of">Son Of</option>
              <option value="Daughter Of">Daughter Of</option>
              <option value="Wife Of">Wife Of</option>
              <option value="Father Of">Father Of</option>
              <option value="Mother Of">Mother Of</option>
            </select>
            {errors.relationType?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.relationType.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="relationName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Relation Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="relationName"
              {...register("relationName")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.relationName?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.relationName.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="residentialAddress"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address (Street)
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="residentialAddress"
              {...register("residentialAddress")}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.residentialAddress?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.residentialAddress.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Pincode
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="pincode"
              {...register("pincode")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.pincode?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.pincode.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-2">
            <select
              name="state"
              id="state"
              {...register("state")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 appearance-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                -Select your State-
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            {errors.state?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="district"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            District
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="district"
              {...register("district")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.district?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.district.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="tehsil"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tehsil/Sub-district
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="tehsil"
              {...register("tehsil")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.tehsil?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.tehsil.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City/Village
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="city"
              {...register("city")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.city?.message && (
              <p className="mt-2 text-sm text-red-400">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="photoIdType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Photo ID Type
          </label>
          <div className="mt-2">
            <select
              name="photoIdType"
              id="photoIdType"
              {...register("photoIdType")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                Select photo ID type
              </option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN Card">Pan Card</option>
              <option value="Ration Card">Ration Card</option>
              <option value="Driving Licence">Driving Licence</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Passport">Passport</option>
            </select>
            {errors.photoIdType?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.photoIdType.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="photoIdNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Photo ID Number
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="photoIdNumber"
              {...register("photoIdNumber")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.photoIdNumber?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.photoIdNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="mobileNo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile No.
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="mobileNo"
              {...register("mobileNo")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.mobileNo?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.mobileNo.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email ID
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="email"
              {...register("email")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.email?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="licence"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Licence No
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="licence"
              {...register("licence")}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.licence?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.licence.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepTwo;
