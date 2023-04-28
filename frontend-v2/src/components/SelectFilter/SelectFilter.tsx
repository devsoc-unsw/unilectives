import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { selectFilterStyle } from "./style";

type SelectFilterProps = {
  label: string;
  options: string[];
  onFilterChange: (value: string) => void;
  defaultOption?: string;
};

const SelectFilter = ({
  label,
  options,
  onFilterChange,
  defaultOption,
}: SelectFilterProps) => {
  const [selectedOption, setSelectedOption] = React.useState(
    defaultOption ?? ""
  );

  return (
    <TextField
      id={label}
      select
      size="small"
      sx={{
        minWidth: 100,
        ...selectFilterStyle,
      }}
      value={selectedOption}
      label={label}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        onFilterChange(e.target.value);
      }}
    >
      {!defaultOption && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectFilter;
