import { FC } from "react";

const Footer: FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <div className="flex justify-center items-center h-16 bg-blue text-white">
      <p>Copyright © {year} Apply-J. All rights reserved.</p>
    </div>
  );
};

export default Footer;
