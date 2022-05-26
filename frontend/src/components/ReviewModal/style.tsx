import styled from "styled-components";
import { palette } from "src/components/palette/palette";

export const Dim = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  // max-height: 90vh;
  // z-index: 101;
  background: #EFEFEF;
  padding: 2rem;
  border-radius: 0.6rem;
  flex-wrap: wrap;
  flex-direction: row;
  // justify-content: space-around;
  // align-items: start;
  // // position: fixed;
  // min-width: 400px;
`;

export const CloseLockup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
`;

export const FormField = styled.title`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
	color: #c4c4c4;
	border-radius: 0.7rem;
	height: 2rem;
	background-color: white;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  background-color: lightblue;
  width: 30%;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  background: grey;
  background-color: lightblue;
  margin-right: 1rem;
  width: 70%;
`;

export const ReviewBodyField = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1rem;
	color: #c4c4c4;
	border-radius: 0.7rem;
	height: 20rem;
	background-color: white;
`;

export const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
	border-bottom: none;
  border-color: ${palette.dayNavy};
  border-width: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const Item = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
  background: #dbdbdb;
`;

export const WholeContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  // background: grey;
  background-color: pink;
  margin-top: 1rem;
  // space contents out evenly
  justify-content: space-evenly;
`;

export const CourseField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 0.6rem;
  height: 2rem;
`;

export const TermAndGradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: pink;
`;

export const TermField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  width: 45%;
  height: 1.5rem;
  border-radius: 0.6rem;
`;

export const LeftFooter = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  // align-items: center;
`;



  



