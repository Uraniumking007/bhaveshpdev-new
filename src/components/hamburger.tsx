import React from "react";

const Hamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-6 h-6 sm:w-8 sm:h-8 flex justify-around flex-col z-50 lg:hidden">
      <div
        className={`w-6 h-[0.1rem] sm:w-8 sm:h-[0.15rem] rounded-sm bg-white origin-[1px] transition-all duration-300 ease-linear ${
          isOpen ? "rotate-[45deg]" : "rotate-0"
        } `}
      />
      <div
        className={`w-6 h-[0.1rem] sm:w-8 sm:h-[0.15rem] rounded-sm bg-white origin-[1px] transition-all duration-300 ease-linear ${
          isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        } `}
      />
      <div
        className={`w-6 h-[0.1rem] sm:w-8 sm:h-[0.15rem] rounded-sm bg-white origin-[1px] transition-all duration-300 ease-linear ${
          isOpen ? "rotate-[-45deg]" : "rotate-0"
        } `}
      />
    </div>
  );
};

export default Hamburger;
