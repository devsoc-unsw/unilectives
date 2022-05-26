
import { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import { CloseLockup, Dim, ModalContent, FormField, ReviewBodyField, Input, RightContainer, CourseField, LeftContainer, WholeContainer } from "./style";
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
              left side
              <FormField>
                Inside FormField
              </FormField>
              <ReviewBodyField>
                Inside ReviewBodyField
                {/* <Input
                  placeholder="Enter your zID"
                /> */}
              </ReviewBodyField>
            </LeftContainer>
            <RightContainer>
              right container
              <p>Which course?</p>
              <CourseField>
                Hey
              </CourseField>

            </RightContainer>
          </WholeContainer>
        </ModalContent>
      </Dim>
    );
  };
  
  export default Dialog;