import { SxProps } from "@mui/material/styles";

export const searchbarStyle = (
  mainColour: string,
  hoverColour: string,
  placeholderColour: string
) => {
  return {
    "& .MuiOutlinedInput-root": {
      paddingX: "15px",
      "& > fieldset": {
        borderRadius: "30px",
        borderWidth: "2.3px",
      },
      "& > fieldset, &.Mui-focused > fieldset": {
        borderColor: mainColour,
      },
      "&:hover > fieldset": {
        borderColor: hoverColour,
      },
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      paddingX: "15px",
      color: mainColour,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: mainColour,
    },
    "& .MuiOutlinedInput-input": {
      color: placeholderColour,
    },
    "& .MuiFormLabel-filled": {
      color: mainColour,
    },
    marginTop: "85px",
    "& .MuiInputLabel-outlined": {
      fontSize: "1.2rem",
    },
  } as SxProps;
};
