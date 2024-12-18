import { Box, useMediaQuery } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

import { theme } from "@/theme";
import Dialog from "@mui/material/Dialog";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
  onCancel?: () => void;
} & Record<string, any>;

const CustomDialog = ({ children, isOpen, onCancel, ...restProps }: Props) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl")); // shift to useAuthContext


  return (
    <>
      { isOpen ? (
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "1.2rem",
            },
          }}
          open={isOpen!}
          onClose={() => {
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              backgroundColor: theme.palette.common.white,
              maxWidth: "900px",
              maxHeight: "820px",
              width: isSmallScreen ? "90%" : "auto",
              height: "90%",
              zIndex: 9999999,
              color: theme.palette.black[800],
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...restProps}
          >
            {children}
          </Box>
        </Dialog>
      ) : null}
    </>
  );
};

export default CustomDialog;
