import { FC, useEffect } from "react";
import { STATES } from "../../utils/constants";
import { useSelector } from "react-redux";
import RootState from "../../interfaces/state/root.state";
import { NewUserProps } from "../../interfaces/props/user.props";
import { useAppDispatch } from "../../redux/store/index";
import { useForm } from "react-hook-form";
import { Status } from "../../interfaces/state/base-req.state";
import { ICompany } from "../../interfaces/models/ICompany";
import { registerCompany } from "../../redux/actions/company.actions";
import { selectCompanyError } from "../../redux/slices/company.slice";

type FormData = {
  name: string;
  owner: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  netWorth: number;
  employeesCount: number;
};

const NewCompany: FC<NewUserProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const error: undefined | string = useSelector(selectCompanyError);
  const status: Status = useSelector(
    (state: RootState) => state.companies.status
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  useEffect(() => {
  }, [errors]);

  const isPending = (): boolean => status === "pending";

  const onSubmit = handleSubmit(
    async (data): Promise<void> => {
      await dispatch(registerCompany({ ...data, user: user._id } as ICompany));
    }
  );

  const states = (): JSX.Element[] =>
    STATES.map((state: string, idx: number) => (
      <option key={idx}>{state}</option>
    ));

  return (
    <section
      style={{ marginTop: "12%" }}
      className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <form onSubmit={onSubmit}>
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Register your company
        </h2>

        <div className="mt-8 ">
          <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Name
              </label>
              <input
                {...register("name")}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={user?.name}
                disabled={true}
                defaultValue={user.name}
                type="text"
              />
            </div>
            <div className="w-full mx-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Owner
              </label>
              <input
                {...register("owner", {
                  required: "The owner's name is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.owner ? (
                <span className="text-red-500">{errors.owner.message}</span>
              ) : null}
            </div>
          </div>
          <div className="items-center mt-3 -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Net Worth
              </label>
              <input
                {...register("netWorth", {
                  required: "The net worth is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="number"
              />
              {errors.netWorth ? (
                <span className="text-red-500">{errors.netWorth.message}</span>
              ) : null}
            </div>
            <div className="w-full mx-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Employees
              </label>
              <input
                {...register("employeesCount", {
                  required: "The number of employees is required.",
                })}
                type="number"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.employeesCount ? (
                <span className="text-red-500">
                  {errors.employeesCount.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="w-full mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Adress Line 1
            </label>
            <input
              {...register("addressLine1", {
                required: "This field is required.",
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
            />
            {errors.addressLine1 ? (
              <span className="text-red-500">
                {errors.addressLine1.message}
              </span>
            ) : null}
          </div>
          <div className="-mx-3 md:flex mb-2 mt-5">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                {...register("city", {
                  required: "The city is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                id="grid-city"
                type="text"
              />
              {errors.city ? (
                <span className="text-red-500">{errors.city.message}</span>
              ) : null}
            </div>
            <div className="md:w-1/2 px-3 sm:mb-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  {...register("state")}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  id="grid-state"
                >
                  {states()}
                </select>
                <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip code
              </label>
              <input
                {...register("zipCode", {
                  required: "The zip code is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                id="grid-zip"
                type="text"
              />
              {errors.zipCode ? (
                <span className="text-red-500">{errors.zipCode.message}</span>
              ) : null}
            </div>
          </div>

          {error ? <p className="text-red-500">{error}</p> : null}

          <div className="flex justify-center mt-6">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-white-500 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isPending() && (
                <div className="animate-spin h-5 w-5 mr-3">
                  <i className="fas fa-spinner"></i>
                </div>
              )}
              {isPending() ? "Loading..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewCompany;
