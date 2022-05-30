import * as React from "react";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
// import { ICourse } from "../../interfaces/ResponseInterface";

type SearchbarProps = {
  displayFilters: boolean;
};

const sortByOptions = ["Most reviewed", "Alphabetical order", "Highest rating"];
const faculties = ["Business", "Engineering", "Science", "Medicine"];
const terms = ["Summer", "1", "2", "3"];

/**
 * If displayFilters is false, then searchbar is shown in the header
 * TODO: Add logic to update parent component data for courses
 * TODO: Add the rest of the faculties; fix current ones for proper naming
 *      and confirm sortBy options with leads
 * TODO: Consider changing the default colours of the components
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
              borderRadius: "30px",
            },
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
              paddingX: "15px",
            },
          }}
          id="input-with-icon-textfield"
          placeholder="COMP1511"
          label="Search for a course"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
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
            variant="standard"
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ width: "fit-content" }}
          >
            {sortByOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Stack spacing={3} direction="row">
            <TextField
              size="small"
              variant="standard"
              sx={{ minWidth: 100 }}
              select
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
              size="small"
              variant="standard"
              sx={{ minWidth: 100 }}
              select
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
