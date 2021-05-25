import { FC } from "react";
import { Link as RouteLink } from "react-router-dom";

interface NavDrowndownProps {
  toggle: () => void;
  isOpen: boolean;
}

const NavDropdown: FC<NavDrowndownProps> = ({ toggle, isOpen }) => {
  return (
    <div
      className={
        isOpen
          ? "grid grid-rows-4 text-center items-center bg-gray-200"
          : "hidden"
      }
      onClick={toggle}
    >
      <RouteLink className="p-4 text-base font-bold" to="/job-posts">
        <p className="p-4 text-lg">Job Posts</p>
      </RouteLink>
      <RouteLink className="p-4 text-base font-bold" to="/sign-in">
        Sign in
      </RouteLink>
      <RouteLink className="p-4 text-base font-bold" to="/sign-up">
        Sign up
      </RouteLink>
    </div>
  );
};

export default NavDropdown;
