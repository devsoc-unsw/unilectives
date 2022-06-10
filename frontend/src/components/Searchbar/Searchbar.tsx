import * as React from "react";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { SxProps } from "@mui/material/styles";

type SearchbarProps = {
  displayFilters: boolean;
};

const sortByOptions = ["Most reviewed", "Alphabetical order", "Highest rating"];
const faculties = ["Business", "Engineering", "Science", "Medicine"];
const terms = ["Summer", "1", "2", "3"];

const selectFilterStyle: SxProps = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      border: "0 solid transparent",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0 solid transparent",
  },
  "& .MuiFormLabel-filled": {
    color: "primary.main",
  },
};

/**
 * If displayFilters is false, then searchbar is shown in the header
 * TODO: Add logic to update parent component data for courses
 * TODO: Add the rest of the faculties; fix current ones for proper naming
 *      and confirm sortBy options with leads
 * TODO: Confirm whether we want the search button, if so add logic,
 *       else, change to startAdornment icon
 */

const Searchbar = ({ displayFilters }: SearchbarProps) => {
  const [sortBy, setSortBy] = React.useState("Most reviewed");
  const [faculty, setFaculty] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [search, setSearch] = React.useState("");

  return (
    <Stack sx={{ width: { xs: "80%", sm: "70%" } }} spacing={4}>
      <Stack>
        <TextField
          fullWidth={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingX: "15px",
              "& > fieldset": {
                borderRadius: "30px",
                borderWidth: "2px",
              },
              "& > fieldset, &.Mui-focused > fieldset": {
                borderColor: displayFilters ? "primary.main" : "#e0e0e0",
              },
              "&:hover > fieldset": {
                borderColor: displayFilters ? "primary.light" : "#aeaeae",
              },
            },
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
              paddingX: "15px",
              color: displayFilters ? "default" : "#e0e0e0",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: displayFilters ? "primary.main" : "#e0e0e0",
            },
            "& .MuiOutlinedInput-input": {
              color: displayFilters ? "currentColor" : "#e0e0e0",
            },
            "& .MuiFormLabel-filled": {
              color: displayFilters ? "primary.light" : "#e0e0e0",
            },
          }}
          placeholder="COMP1511"
          label="Search for a course"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon
                    sx={{ color: displayFilters ? "primary.main" : "#e0e0e0" }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      {displayFilters && (
        <Stack
          px={2}
          spacing={3}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <TextField
            size="small"
            select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              width: "fit-content",
              ...selectFilterStyle,
            }}
          >
            {sortByOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Stack spacing={3} direction="row">
            <TextField
              select
              size="small"
              sx={{
                minWidth: 100,
                ...selectFilterStyle,
              }}
              value={faculty}
              label="Faculty"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {faculties.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              sx={{
                minWidth: 100,
                ...selectFilterStyle,
              }}
              value={term}
              label="Term"
              onChange={(e) => setTerm(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {terms.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Searchbar;
