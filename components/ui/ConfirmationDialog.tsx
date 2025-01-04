import React from "react";
import Button from "./Button";
import Text from "./Text";

interface ConfirmationDialogProps {
  className?: string;
  children?: React.ReactNode;
  onYes: () => void;
  onNo: () => void;
  disabled?: boolean;
}

const ConfirmationDialog = ({
  className = "",
  children,
  onNo,
  onYes,
  disabled,
}: ConfirmationDialogProps) => {
  return (
    <div className={`${className}`}>
      {children && <Text>{children}</Text>}

      <div className={`flex items-center space-x-2 `}>
        <Button
          disabled={disabled}
          variant="empty"
          className="w-full !max-w-full bg-danger/80 hover:bg-danger/100 text-white"
          onClick={onYes}
        >
          YES
        </Button>
        <Button
          disabled={disabled}
          variant="empty"
          className="w-full !max-w-full border border-danger text-danger"
          onClick={onNo}
        >
          NO
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
