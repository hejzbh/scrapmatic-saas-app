import React from "react";
import useToats, { ToastType } from "@/hooks/use-toats";
import Text from "./Text";
import { IoMdClose } from "react-icons/io";

export const Toast = ({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: ToastType["type"];
}) => {
  const { removeToast } = useToats();

  const toastStyles: Record<ToastType["type"], string> = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    info: "bg-info text-white",
  };

  return (
    <div
      className={`fixed top-10 left-1/2 transform min-w-[200px] md:min-w-[350px] -translate-x-1/2 mb-4 max-w-xs w-full p-4 rounded-md shadow-lg flex items-center space-x-3 transition-all ease-in-out ${toastStyles[type]}`}
      onClick={() => removeToast(id)}
    >
      <div className="flex-1 mr-4">
        <Text className="!text-white">{message}</Text>
      </div>
      <button
        className=" text-white rounded-lg hover:opacity-80 cursor-pointer p-1"
        onClick={() => removeToast(id)}
      >
        <IoMdClose className="text-lg" />
      </button>
    </div>
  );
};

export default Toast;
