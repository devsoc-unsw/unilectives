import styled from "styled-components";

// not used anymore
export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  height: 11.5rem;
  width: 20rem;
  max-width: 100%;
  padding: 0.5rem 0.2rem 0.65rem 0.2rem;
  margin: auto;
`;

export const CardContentsContainer = styled.div`
  display: flex;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 1.5rem 1.2rem 0.8rem 1.2rem;
  margin: auto auto;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
`;

export const CardContentsColumn = styled.div`
  width: 50%;
`;

export const CardContentsTitle = styled.div`
  font-size: 23px;
  font-weight: 500;
  margin: 0.2rem 0 0.5rem 0.5rem;
`;

export const CardContentsDesc = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const CardContentsExtras = styled.div`
  font-size: 11px;
  padding-left: 0.2rem;
`;

export const CardContentsFaculty = styled.div`
  border-radius: 8px;
  background-color: #e8d3f4;
  display: inline-block;
  margin: 0.2rem;
  padding: 0.25rem 0.4rem;
  width: auto;
`;

export const CardContentsRating = styled.div`
  margin: 0.1rem 0 0 0;
  padding-right: 0.2rem;
`;

export const CardContentsReviews = styled.div`
  text-align: right;
  color: #808080;
  margin-right: 0.3rem;
  padding: 0 0.5rem 0.2rem 0;
  font-size: 13px;
`;

export const CardCategoriesTable = styled.table`
  font-size: 12px;
  font-weight: 400;
  padding-top: 1rem;
  width: 100%;
  table {
    width: 100%;
    padding-left: 0.5rem;
  }
  th {
    text-align: left;
    font-weight: 400;
  }
  th,
  td {
    padding: 0.3rem 0.3rem 0.5rem 0.3rem;
  }
`;

export const CardCategories = styled.div`
  width: 80%;
`;

export const CardCategoryValues = styled.div`
  width: 80%;
`;
