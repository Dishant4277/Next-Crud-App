import React from "react";

const Status = ({ publish }: { publish: Number }) => {
  return Number(publish) > 0 ? (
    <button className="h-4 w-12 text-[10px] text-center g-transparent text-green-500 my-2   cursor-default  border border-green-500  rounded-full">
      Public
    </button>
  ) : (
    <button className="h-4 w-12 text-[10px] text-center g-transparent text-red-500 my-2   cursor-default  border border-red-500  rounded-full">
      Private
    </button>
  );
};

export default Status;
