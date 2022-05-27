
import { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
// import StarIcon from '@mui/icons-material/Star';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { CloseLockup, Dim, ModalContent, ReviewTitleInput, LeftFooter, MiddleVerticalLine, SubmitButton, ReviewBodyInput, RatingsContainer,
  Input, RightContainer, CourseField, LeftContainer, WholeContainer, TermAndGradeContainer, TermField } from "./style";
// import grid from material ui grid
import { Checkbox, Typography, Rating } from "@mui/material";
// import { Checkbox } from '@mui/icons-material';

const Dialog = ({ close, title, children, modalSize }: DialogProps) => {
    return (
      <Dim>
        Hello
        <ModalContent style={{ width: modalSize ? `${modalSize}%` : "50%" }}>
          <CloseLockup>
            <Icon src={CloseIcon} size={2} onClick={close} />
          </CloseLockup>
          {title && (
            <Text bold fontSize="1.375rem">
              {title}
            </Text>
          )}
          {children}
          <Text noMargin fontSize="1.7rem" style={{ margin: "0.8rem 0.8rem 0rem 1rem" }}>
          	Submit a Review.
					</Text>
          <WholeContainer>
            <LeftContainer>
              <ReviewTitleInput placeholder="Title">
              </ReviewTitleInput>
              <ReviewBodyInput placeholder="Enter review here"/>
              <LeftFooter>
                <Text fontSize="0.95rem" style={{ marginLeft: "0rem" }}>
                  Display as anonymous
                </Text>
                <Checkbox defaultChecked 
                  sx={{
                    color: "#2f302f",
                    '&.Mui-checked': {
                      color: "#2f302f",
                    },
                  }}
                />
                <SubmitButton>Submit</SubmitButton>
              </LeftFooter>
            </LeftContainer>
            <MiddleVerticalLine />
            <RightContainer>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Course Code
              </Text>
              <CourseField placeholder="COMP1511"/>
              Term Taken
              <TermAndGradeContainer>
                {/* <TermField placeholder="Term"/> */}
                <CourseField placeholder="Term" style={{width: "50%", margin: "0.2rem", height: "1.2rem"}}/>
                <CourseField placeholder="Grade" style={{width: "50%", margin: "0.2rem", height: "1.2rem"}}/>
              </TermAndGradeContainer>

              <RatingsContainer>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Overall Rating
                </Text>
                <div>
                  <StarRoundedIcon fontSize="large" style={{ color: "#CED9DD"}} />
                  <StarRoundedIcon fontSize="large" style={{ color: "#CED9DD"}} />
                  <StarRoundedIcon fontSize="large" style={{ color: "#CED9DD"}} />
                  <StarRoundedIcon fontSize="large" style={{ color: "#CED9DD"}} />
                  <StarRoundedIcon fontSize="large" style={{ color: "#CED9DD"}} />
                  {/* <Rating
                    name="text-feedback"
                    value={1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  /> */}
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Enjoyability
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  {/* make icon with margin right of 1rem */}
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Usefulness
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Manageability
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                  <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/> 
                </div>
              </RatingsContainer>
            </RightContainer>
          </WholeContainer>
        </ModalContent>
      </Dim>
    );
  };
  
  export default Dialog;