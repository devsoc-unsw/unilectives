import * as React from "react";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { palette } from "../palette/palette";
import SelectFilter from "../SelectFilter/SelectFilter";
import { searchbarStyle } from "./style";
import { ICourse } from "src/interfaces/ResponseInterface";

type SearchbarProps = {
  courses: ICourse[];
  onSearchChange: React.Dispatch<React.SetStateAction<ICourse[]>>;
};

const sortByOptions = ["Most reviewed", "Alphabetical order", "Highest rating"];
const faculties = ["Business", "Engineering", "Science", "Medicine"];
const terms = ["Summer", "1", "2", "3"];

/**
 *
 * TODO: Add more faculties and/or rewrite the current ones
 * TODO: The filters currently work one at a time - plz fix and write the sort by logic as well
 * Search bar should check courseCode, title and description
 * Feel feel to extract the current logic into a function
 * TODO: Write tests for the searchbar component
 * Delete the TODOs when done
 *
 */
const Searchbar = ({ courses, onSearchChange }: SearchbarProps) => {
  const [search, setSearch] = React.useState("");

  return (
    <Stack sx={{ width: { xs: "80%", sm: "70%" } }} spacing={4}>
      <Stack>
        <TextField
          variant="outlined"
          fullWidth={true}
          sx={searchbarStyle(palette.dayNavy, palette.nightNavy, "default")}
          placeholder="COMP1511"
          label="Search for a course"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon
                    sx={{
                      color: palette.dayNavy,
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearchChange(
              courses.filter((course) =>
                course.courseCode
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
        />
      </Stack>

      <Stack
        px={2}
        spacing={3}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <SelectFilter
          label="Sort by"
          options={sortByOptions}
          onFilterChange={() => {
            console.log("some filtering logic");
          }}
          defaultOption={sortByOptions[0]}
        ></SelectFilter>
        <Stack spacing={3} direction="row">
          <SelectFilter
            label="Faculty"
            options={faculties}
            onFilterChange={(faculty) => {
              console.log(courses, faculty);
              if (courses) {
                onSearchChange(
                  courses.filter(
                    (course) => !faculty || course.faculty == faculty
                  )
                );
              }
            }}
          ></SelectFilter>
          <SelectFilter
            label="Term"
            options={terms}
            onFilterChange={(term) => {
              if (courses) {
                onSearchChange(
                  courses.filter((course) =>
                    course.terms.includes(terms.indexOf(term))
                  )
                );
              }
            }}
          ></SelectFilter>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Searchbar;
