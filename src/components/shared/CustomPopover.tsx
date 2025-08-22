import * as React from "react";
import { Button, ClickAwayListener } from "@mui/base";
type PopupProps = {
  buttonTitleLabel: string;
  children: React.ReactNode;
  buttonClassName?: string;
  isOpen: boolean;
  handleClose: (event: boolean) => void;
};

export default function CustomPopover({
  buttonTitleLabel,
  children,
  buttonClassName,
  handleClose,
  isOpen,
}: PopupProps) {
  const handleClick = () => {
    handleClose(isOpen ? false : true);
  };

  const handleClickAway = () => {
    handleClose(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <button type="button" onClick={handleClick}>
          {buttonTitleLabel}
        </button>
        {isOpen ? <>{children}</> : null}
      </div>
    </ClickAwayListener>
  );
}
