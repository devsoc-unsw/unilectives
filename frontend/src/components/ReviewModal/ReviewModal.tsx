
import { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
// import StarIcon from '@mui/icons-material/Star';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { CloseLockup, Dim, ModalContent, ReviewTitleInput, LeftFooter, SubmitButton, ReviewBodyInput, RatingsContainer,
  Input, RightContainer, CourseField, LeftContainer, WholeContainer, TermAndGradeContainer, TermField } from "./style";
// import grid from material ui grid
// import { Grid } from "@material-ui/core";
// import { Star } from '@mui/icons-material';

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
                <CheckBoxOutlinedIcon style={{ marginLeft: "0.7rem" }}/>
                <SubmitButton>Submit</SubmitButton>
              </LeftFooter>
            </LeftContainer>
            <RightContainer>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Course Code
              </Text>
              <CourseField placeholder="COMP1511"/>
              Term Taken
              <TermAndGradeContainer>
                <TermField>
                  Term
                </TermField>
                <TermField>
                  Grade
                </TermField>
              </TermAndGradeContainer>
              <RatingsContainer>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Overall Rating
                </Text>
                <div>
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Enjoyability
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  {/* make icon with margin right of 1rem */}
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Usefulness
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Manageability
                </Text>
                <div style= {{padding: "0.3rem"}}>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/>
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                  <CircleRoundedIcon fontSize="extra small" style={{ marginRight: "0.5rem" }}/> 
                </div>
              </RatingsContainer>
            </RightContainer>
          </WholeContainer>
        </ModalContent>
      </Dim>
    );
  };
  
  export default Dialog;