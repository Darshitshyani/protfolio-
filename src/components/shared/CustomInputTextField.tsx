import { theme } from "@/theme";
import {
  Box,
  FormHelperText,
  Icon,
  InputBase,
  InputBaseProps,
  Stack,
} from "@mui/material";
import { forwardRef } from "react";
type Props = {
  type?: "button" | "reset" | "submit";
  name?: string;
  tag?: string;
  tagStyle?: string;
  startIcon?: React.ReactElement;
  StartIconHandleEvent?: () => void;
  StartIconStyle: string;
  endIcon?: React.ReactElement;
  EndIconHandleEvent?: () => void;
  EndIconStyle: string;
  error: string;
  className?: string;
  inputFieldClass?: string;
} & Record<string, any>;

const CustomInputTextField = forwardRef((props: Props, ref) => {
  const {
    name,
    type,
    StartIcon,
    StartIconStyle,
    StartIconHandleEvent,
    EndIcon,
    EndIconStyle,
    EndIconHandleEvent,
    tag,
    tagStyle,
    error,
    ...restProps
  } = props;

  return (
    <div {...restProps}>
      {tag && (
        <Box
          sx={{
            fontWeight: 400,
            paddingBottom: 2,
            letterSpacing: "0.025rem",
            fontSize: "0.875rem",
            color: theme.palette.common.white,
          }}
        >
          <h6 className={tagStyle}>{tag}</h6>
        </Box>
      )}
      <Box
        {...restProps}
        sx={{
          fontSize: "16px",
          display: "flex",

          alignItems: "center",
          width: "100%",
          borderRadius: "10px",
          borderColor: theme.palette.black[200],
          borderWidth: "1px",
          padding: "10px",
          backgroundColor: "transparent",
        }}
      >
        {StartIcon && (
          <Box
            sx={{
              fontSize: "1.25rem",
              marginRight: "10px",
              // color: theme.palette.black[400],
            }}
            onClick={StartIconHandleEvent}
            className={StartIconStyle}
          >
            {StartIcon}
          </Box>
        )}
        <InputBase
          type={type}
          style={{ border: "0px" }}
          placeholder={restProps.placeholder}
          sx={{
            flexGrow: 1,
            color: theme.palette.black[900],
            padding: "0px",
            fontSize: "0.875rem",
            letterSpacing: "0.04rem",
            input: {
              padding: "0px",
              display: "flex",
              alignItems: "center",
              "&::placeholder": {
                opacity: 1,
                color: theme.palette.black[400],
                fontSize: "16px",
              },
            },
          }}
          {...restProps}
        />
        {EndIcon && (
          <Box
            sx={{
              fontSize: "1.25rem",
              color: theme.palette.black[100],
            }}
            onClick={EndIconHandleEvent}
            className={EndIconStyle}
          >
            {EndIcon}
          </Box>
        )}
      </Box>
      {error && (
        <FormHelperText error focused>
          {error}
        </FormHelperText>
      )}
    </div>
  );
});

CustomInputTextField.displayName = "CustomInputTextField";

export default CustomInputTextField;
