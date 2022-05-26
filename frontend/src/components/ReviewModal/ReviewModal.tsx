
import { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import { CloseLockup, Dim, ModalContent, FormField, ReviewBodyField, LeftFooter,
  Input, RightContainer, CourseField, LeftContainer, WholeContainer, TermAndGradeContainer, TermField } from "./style";
// import grid from material ui grid
// import { Grid } from "@material-ui/core";

const Dialog = ({ close, title, children, modalSize }: DialogProps) => {
    return (
      <Dim>
        Hello
        <ModalContent style={{ width: modalSize ? `${modalSize}%` : "60%" }}>
          <CloseLockup>
            <Icon src={CloseIcon} size={2} onClick={close} />
          </CloseLockup>
          {title && (
            <Text bold fontSize="1.375rem">
              {title}
            </Text>
          )}
          {children}
          <Text noMargin fontSize="2rem" style={{ marginBottom: "2rem" }}>
          	Submit a Review.
					</Text>
          <WholeContainer>
            <LeftContainer>
              <FormField>
                Inside FormField
              </FormField>
              <ReviewBodyField>
                Inside ReviewBodyField
                {/* <Input
                  placeholder="Enter your zID"
                /> */}
              </ReviewBodyField>
              <LeftFooter>
                <Text fontSize="0.95rem" style={{ marginLeft: "0.7rem" }}>
                  Display as anonymous
                </Text>
              </LeftFooter>
            </LeftContainer>
            <RightContainer>
              Which course?
              <CourseField>
                Hey
              </CourseField>
              Term Taken
              <TermAndGradeContainer>
                
                <TermField>
                  Term
                </TermField>
                <TermField>
                  Grade
                </TermField>
              </TermAndGradeContainer>
              Overall Rating
              <span>Enjoyability</span>
              <span>Usefulness</span>
              <span>Manageability</span>

            </RightContainer>
          </WholeContainer>
        </ModalContent>
      </Dim>
    );
  };
  
  export default Dialog;