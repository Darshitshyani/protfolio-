import { theme } from "@/theme";
import { Button, IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
  type?: "button" | "reset" | "submit";
  name?: string;
  handleEvent?: () => void;
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement;
} & Record<string, any>;

const CustomButton = (props: Props) => {
  const { type, name, handleEvent, startIcon, endIcon, ...restProps } = props;
  return (
    <Button
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "12px",
        paddingX: "1rem",
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: "1.5rem",
        letterSpacing: "0.02em",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #3BA6FF 100%)`,
        boxShadow: "0 4px 14px 0 rgba(30, 144, 255, 0.39)",
        color: "white",
        py: 1.5,
        transition: "all 0.3s ease-in-out",
        textTransform: "none",
        "&:hover": {
          background: `linear-gradient(135deg, #3BA6FF 0%, ${theme.palette.primary.main} 100%)`,
          boxShadow: "0 6px 20px rgba(30, 144, 255, 0.23)",
          transform: "translateY(-2px)",
        },
        "&:focus-visible": {
          outline: "inherit",
          "&:after": {
            outline: "2px solid",
          },
          "&:before": {
            outlineOffset: "2px",
          },
        },
      }}
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      type={type ? type : "button"}
      onClick={handleEvent ? handleEvent : undefined}
      {...restProps}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
