import { logout } from "../../redux/slices/auth.slice";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import RootState from "../../interfaces/state/root.state";
import { useAppDispatch } from "../../redux/store";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  const ConditionalAuth = () => (
    <>
      {!currentUser && (
        <>
          <li>
            <RouteLink
              aria-label="Sign in"
              title="Sign in"
              to="/auth/sign-in"
              className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-600 
              ${path === "/auth/sign-in" ? "text-blue-600" : "text-gray-700"}
              `}
            >
              Sign in
            </RouteLink>
          </li>
          <li>
            <RouteLink
              aria-label="Sign up"
              title="Sign up"
              to="/auth/sign-up"
              className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-600 
              ${path === "/auth/sign-up" ? "text-blue-600" : "text-gray-700"}
              `}
            >
              Sign up
            </RouteLink>
          </li>
        </>
      )}
      {currentUser && (
        <li>
          <RouteLink
            onClick={() => dispatch(logout())}
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-600"
            to="/auth/sign-in"
          >
            Logout
          </RouteLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white max-w-full">
      <div className="px-4 py-2 lg:py-4 md:py-3 sm:py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  md:px-24 lg:px-8  ">
        <div className="relative flex items-center justify-between ">
          <RouteLink
            to="/"
            aria-label="Apply-J"
            title="Apply-J"
            className="inline-flex items-center"
          >
            <i className="fas fa-signature text-2xl"></i>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Apply-J
            </span>
          </RouteLink>
          <ul className="flex items-center hidden mt-1 space-x-8 lg:flex">
            <li>
              <RouteLink
                aria-label="Job Posts"
                title="Job Posts"
                to="/job-posts"
                className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-600
                    ${path === "/job-posts" ? "text-blue-600" : "text-gray-700"}
                `}
              >
                Job Posts
              </RouteLink>
            </li>
            {<ConditionalAuth />}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <RouteLink
                        to="/"
                        aria-label="Apply-J"
                        title="Apply-J"
                        className="inline-flex items-center"
                      >
                        <i className="fas fa-signature text-2xl"></i>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Apply-J
                        </span>
                      </RouteLink>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <RouteLink
                          aria-label="Job Posts"
                          title="Job Posts"
                          to="/job-posts"
                          className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-600
                          ${
                            path === "/job-posts"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }
                      `}
                        >
                          Job Posts
                        </RouteLink>
                      </li>
                      <ConditionalAuth />
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
