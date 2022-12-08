import styled from "styled-components";

export const DescTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const DescContent = styled.div`
    max-height: 80%;
    font-size: 12px;
    text-overflow:ellipsis;
    overflow:hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    white-space: normal;
`;

export const CardContentsGroup = styled.div`
    width: 21rem;
    display: flex;
    flex-direction: row;
`;

export const CardContentsColumn = styled.div`
    min-width: 48%;
    margin-right: 10px;
`;

export const CardContentsDesc = styled.div`
    width: 40%;
`;
