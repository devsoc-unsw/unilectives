/* eslint-disable max-len */
import * as React from "react";
import { ButtonGroup, IconButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import MenuIcon from '@mui/icons-material/Menu';
import { SwitchContainer } from './style'


type SearchbarProps = {
  onViewChange: React.Dispatch<React.SetStateAction<string>>;
};

const CourseViewSwitch = ({ onViewChange }: SearchbarProps) => {

  return (
    <SwitchContainer>
        <ButtonGroup variant="contained">
            <IconButton>
            <GridViewIcon
                onClick={() => onViewChange('card')}
            />
            </IconButton>
            <IconButton>
            <MenuIcon
                onClick={() => onViewChange('list')}
            />
            </IconButton>
        </ButtonGroup>
    </SwitchContainer>
  );
};

export default CourseViewSwitch;
