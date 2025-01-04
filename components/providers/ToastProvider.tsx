"use client";
import useToats from "@/hooks/use-toats";
import Toast from "@/components/ui/Toast";

export const ToastProvider = () => {
  const { toasts } = useToats();

  return (
    <div className="z-[2000] fixed top-0 left-0 right-0 flex flex-col items-center space-y-4 p-4 ">
      {toasts.map((toast, i) => (
        <div key={toast.id} style={{ zIndex: i + 1, marginTop: i + 15 + "px" }}>
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
};
