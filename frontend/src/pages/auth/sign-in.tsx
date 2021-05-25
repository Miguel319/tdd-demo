import { useForm, useWatch } from "react-hook-form";
import { Link as RouteLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/index";
import RootState from "../../interfaces/state/root.state";
import { Status } from "../../interfaces/state/base-req.state";
import { useSelector } from "react-redux";
import { selectAuthError, setAuthError } from "../../redux/slices/auth.slice";
import { signIn } from "../../redux/actions/auth.action";
import { useEffect, useState } from "react";
import { notification } from "../../utils/notification";
import { useHistory } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  const status: Status = useSelector((state: RootState) => state.auth.status);
  const error: undefined | string = useSelector(selectAuthError);
  const history = useHistory();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  useEffect(() => {
    if (error) dispatch(setAuthError(undefined));
  }, [email, password]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (submitted && status === "fulfilled" && !error && token) {
        notification.success("Signed in successfully!");
        history.push("/");
      }
    } catch {}
  }, [submitted, status, error]);

  const isPending = (): boolean => status === "pending";

  const onSubmit = handleSubmit(async (data) => {
    await dispatch(signIn(data));

    setSubmitted(false);
  });

  return (
    <div
      style={{ marginTop: "12%" }}
      className="flex  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl"
    >
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dvoo3wu0v/image/upload/v1618280853/bg-city_spnell.jpg?auto=format&fit=crop&w=1575&q=80")',
        }}
      />
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div>
          {" "}
          <p className="text-blue-500 text-4xl text-center mx-auto">
            <i className="fas fa-signature"></i>{" "}
          </p>{" "}
          <h2 className="-mt-7 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              placeholder="email@gmail.com"
              {...register("email", {
                required: "The email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email ? (
              <span className="text-red-500">{errors.email.message}</span>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              {...register("password")}
              placeholder="***********"
              {...register("password", {
                required: "The password is required.",
              })}
            />
            {errors.password ? (
              <span className="text-red-500">{errors.password.message}</span>
            ) : null}
          </div>
          {error ? <p className="text-red-500">{error}</p> : null}
          <div className="mt-8">
            <button
              disabled={isPending()}
              onClick={() => setSubmitted(true)}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
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
              {isPending() ? "Loading..." : "Sign In"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <RouteLink
              to="/auth/sign-up"
              className="text-xs text-blue-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </RouteLink>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
