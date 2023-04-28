import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import { palette } from "../palette/palette";
import { searchbarStyle } from "src/components/Searchbar/style";
import { ICourse } from "src/interfaces/ResponseInterface";
import { useNavigate } from "react-router-dom";

type SearchbarWithMenuProps = {
  courses: ICourse[];
};

const SearchbarWithMenu = ({ courses }: SearchbarWithMenuProps) => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  return (
    <div style={{ position: "absolute", top: 10, right: 150 }}>
      <Autocomplete
        size="small"
        fullWidth
        selectOnFocus
        disableClearable
        forcePopupIcon={false}
        open={search !== ""}
        options={courses}
        onInputChange={(_event, newInputValue) => {
          setSearch(newInputValue);
        }}
        getOptionLabel={(course: ICourse) =>
          `${course.courseCode}: ${course.title}`
        }
        filterOptions={(options, state) =>
          options.filter(
            (option) =>
              option.courseCode.toLowerCase().includes(search.toLowerCase()) ||
              option.title.toLowerCase().includes(search.toLowerCase()) ||
              state.getOptionLabel(option) === search
          )
        }
        onChange={(_event, value) => {
          navigate(`/courses/${value.courseCode}`);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="COMP1511"
            sx={{
              minWidth: 175,
              ...searchbarStyle(
                palette.dayNavy, 
                palette.nightNavy,
                palette.dayNavy
              ),
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: palette.dayNavy,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      ></Autocomplete>
    </div>
  );
};

export default SearchbarWithMenu;
