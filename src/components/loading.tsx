import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center align-middle">
      <Spinner color="blue" />
    </div>
  );
};

export default Loading;
