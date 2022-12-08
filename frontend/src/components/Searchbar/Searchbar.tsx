/* eslint-disable max-len */
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
import CourseViewSwitch from '../CourseViewSwitch/CourseViewSwitch';

type SearchbarProps = {
  courses: ICourse[];
  onSearchChange: React.Dispatch<React.SetStateAction<ICourse[]>>;
  onViewChange: React.Dispatch<React.SetStateAction<string>>;
};

const sortByOptions = ["Most Reviewed", "Alphabetical Order", "Highest Rating"];
const faculties = [
  "All Faculties",
  "Arts",
  "Business",
  "Engineering",
  "Law",
  "Medicine",
  "Science",
  "UNSW Canberra",
];

const terms = ["All Terms", "Summer", "Term 1", "Term 2", "Term 3", "Other"];

/**
 * TODO: Write tests for the searchbar component
 * TODO: do sort by review
 * Delete the TODOs when done
 *
 */
const Searchbar = ({ courses, onSearchChange, onViewChange }: SearchbarProps) => {
  const [search, setSearch] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState(sortByOptions[0]);
  const [facultyFilter, setFacultyFilter] = React.useState(faculties[0]);
  const [termFilter, setTermFilter] = React.useState(terms[0]);

  // this just updates the displayed courses whenever we filter
  React.useEffect(() => {
    if (courses) {
      let filterFaculty = (course: ICourse) => {
        return (
          facultyFilter === faculties[0] || course.faculty === facultyFilter
        );
      };

      let filterTerm = (course: ICourse) => {
        return (
          termFilter === terms[0] ||
          course.terms.includes(terms.indexOf(termFilter) - 1)
        );
      };

      let filterSearch = (course: ICourse) => {
        let checkSearch = (text: string) => {
          return text.toLowerCase().includes(search.toLowerCase());
        };

        return (
          checkSearch(course.courseCode) ||
          checkSearch(course.title) ||
          checkSearch(course.description)
        );
      };

      let filterSort = (courseList: ICourse[]) => {
        var filteredCourses: ICourse[] = [...courseList];

        switch(sortFilter) {
          case "Most Reviewed":
            filteredCourses.sort((c1, c2) => c2.reviewCount - c1.reviewCount)
            break;
          case "Alphabetical Order":
            filteredCourses.sort();
            break;
          case "Highest Rating":
            filteredCourses.sort((c1, c2) => c2.rating - c1.rating);
            break;
          default:
            filteredCourses.sort((c1, c2) => c2.reviewCount - c1.reviewCount)
        }

        return filteredCourses;
      };

      // add extra filter based on words found inside top reviews??
      onSearchChange(
        filterSort(
          courses.filter(
            (course) =>
              filterSearch(course) &&
              filterFaculty(course) &&
              filterTerm(course)
          )
        )
      );
    }
  }, [search, sortFilter, facultyFilter, termFilter]);

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
          onFilterChange={(option) => {
            setSortFilter(option);
          }}
          defaultOption={sortFilter}
        ></SelectFilter>
        <Stack spacing={3} direction="row">
          <SelectFilter
            label="Faculty"
            options={faculties}
            onFilterChange={(faculty) => {
              setFacultyFilter(faculty);
            }}
            defaultOption={facultyFilter}
          ></SelectFilter>
          <SelectFilter
            label="Term"
            options={terms}
            onFilterChange={(term) => {
              setTermFilter(term);
            }}
            defaultOption={termFilter}
          ></SelectFilter>
          <CourseViewSwitch
            onViewChange={onViewChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Searchbar;
