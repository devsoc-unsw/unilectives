import { useEffect, useState } from "react";
import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import {
  CloseLockup,
  Dim,
  ModalContent,
  ReviewTitleInput,
  LeftFooter,
  MiddleVerticalLine,
  SubmitButton,
  ReviewBodyInput,
  RatingsContainer,
  RightContainer,
  CourseField,
  LeftContainer,
  WholeContainer,
  TermAndGradeContainer,
} from "./style";
import { Checkbox } from "@mui/material";
import ReviewRating from "./ReviewRating";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import {
  clearLoadingStatus,
  LoadingStatusTypes,
  postReviewDispatch,
  selectReviewLoadingStatus,
} from "src/logic/redux/reducers/reviewSlice/reviewSlice";
import { IPostReviewRequestBody } from "src/interfaces/ResponseInterface";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { canSubmit } from "src/helpers/helpers";
import { LoadingAnimation } from "../image/imageIndex";

type ReviewModalProps = {
  close: () => void;
  modalSize?: number;
};

const ReviewModal = ({ close, modalSize }: ReviewModalProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loadingStatus = useAppSelector(selectReviewLoadingStatus);

  const [showName, setShowName] = useState<boolean>(false);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [manageability, setManageability] = useState<number>(0);
  const [usefulness, setUsefulness] = useState<number>(0);
  const [enjoyability, setEnjoyability] = useState<number>(0);

  const [review, setReview] = useState({
    zid: user?.user.zid ?? "",
    title: "",
    courseCode: "",
    description: "",
    grade: -1,
    termTaken: "",
  });

  const submitReview = () => {
    // TODO: figure out how we get user's name
    const reviewToSubmit: IPostReviewRequestBody = {
      ...review,
      authorName: showName ? user?.user.zid! : "Anonymous",
      overallRating,
      manageability,
      usefulness,
      enjoyability,
    };
    dispatch(postReviewDispatch(reviewToSubmit));
  };

  useEffect(() => {
    if (loadingStatus === LoadingStatusTypes.POST_REVIEW_COMPLETED) {
      close();
      dispatch(clearLoadingStatus());
    }
  }, [loadingStatus]);

  return (
    <Dim>
      {loadingStatus === LoadingStatusTypes.POST_REVIEW_LOADING ? (
        <img src={LoadingAnimation} />
      ) : (
        <ModalContent style={{ width: modalSize ? `${modalSize}%` : "50%" }}>
          <CloseLockup>
            <Icon src={CloseIcon} size={2} onClick={close} />
          </CloseLockup>
          <Text
            noMargin
            fontSize="1.7rem"
            style={{ margin: "0.8rem 0.8rem 0rem 1rem" }}
          >
            Submit a Review.
          </Text>
          <WholeContainer>
            <LeftContainer>
              <ReviewTitleInput
                placeholder="Title"
                onChange={(e) =>
                  setReview({ ...review, title: e.target.value })
                }
              ></ReviewTitleInput>
              <ReviewBodyInput
                placeholder="Enter review here"
                onChange={(e) =>
                  setReview({ ...review, description: e.target.value })
                }
              />
              <LeftFooter>
                <Text fontSize="0.95rem" style={{ marginLeft: "0rem" }}>
                  Display as anonymous
                </Text>
                <Checkbox
                  checked={!showName}
                  onClick={() => setShowName(!showName)}
                  sx={{
                    color: "#2f302f",
                    "&.Mui-checked": {
                      color: "#2f302f",
                    },
                  }}
                />
                <SubmitButton
                  disabled={
                    !canSubmit({
                      ...review,
                      overallRating,
                      manageability,
                      usefulness,
                      enjoyability,
                      authorName: "",
                    })
                  }
                  onClick={submitReview}
                >
                  Submit
                </SubmitButton>
              </LeftFooter>
              <Text
                fontSize="0.75rem"
                color="#ABABAB"
                style={{ marginLeft: "0.5rem" }}
              >
                By clicking Submit, you have agreed to the Terms and Conditions.
              </Text>
            </LeftContainer>
            <MiddleVerticalLine />
            <RightContainer>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Course Code
              </Text>
              <CourseField
                placeholder="COMP1511"
                onChange={(e) =>
                  setReview({ ...review, courseCode: e.target.value })
                }
              />
              Term Taken&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grade
              <TermAndGradeContainer>
                <CourseField
                  placeholder="Term 1"
                  style={{ width: "50%", margin: "0.2rem", height: "1.2rem" }}
                  onChange={(e) =>
                    setReview({ ...review, termTaken: e.target.value })
                  }
                />
                <CourseField
                  placeholder="N/A"
                  style={{ width: "50%", margin: "0.2rem", height: "1.2rem" }}
                  onChange={(e) => {
                    if (
                      e.target.value !== "100" &&
                      (e.target.value.includes("-") ||
                        e.target.value.length > 2)
                    ) {
                      e.target.value = e.target.value.replace("-", "");
                      e.target.value = e.target.value.slice(0, 2);
                    } else if (Number.isNaN(+e.target.value)) {
                      e.target.value = "";
                    } else {
                      setReview({ ...review, grade: +e.target.value });
                    }
                  }}
                />
              </TermAndGradeContainer>
              <RatingsContainer>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Overall Rating
                </Text>
                <div>
                  <ReviewRating
                    name="OVERALL"
                    rating={overallRating}
                    setRating={(rating) => setOverallRating(rating)}
                  />
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Enjoyability
                </Text>
                <div style={{ padding: "0.3rem" }}>
                  <ReviewRating
                    name="ENJOYABILITY"
                    rating={enjoyability}
                    setRating={(rating) => setEnjoyability(rating)}
                  />
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Usefulness
                </Text>
                <div style={{ padding: "0.3rem" }}>
                  <ReviewRating
                    name="USEFULNESS"
                    rating={usefulness}
                    setRating={(rating) => setUsefulness(rating)}
                  />
                </div>
                <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                  Manageability
                </Text>
                <div style={{ padding: "0.3rem" }}>
                  <ReviewRating
                    name="MANAGEABILITY"
                    rating={manageability}
                    setRating={(rating) => setManageability(rating)}
                  />
                </div>
              </RatingsContainer>
            </RightContainer>
          </WholeContainer>
        </ModalContent>
      )}
    </Dim>
  );
};

export default ReviewModal;
