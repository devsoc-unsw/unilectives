import { SxProps } from "@mui/material/styles";
import { palette } from "../palette/palette";

export const selectFilterStyle: SxProps = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      border: "0 solid transparent",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0 solid transparent",
  },
  "& .MuiInputLabel-shrink": {
    color: palette.dayNavy,
  },
  "& .MuiFormLabel-filled": {
    color: palette.dayNavy,
  },
};
