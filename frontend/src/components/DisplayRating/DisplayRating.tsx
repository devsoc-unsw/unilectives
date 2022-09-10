import React from "react"
import { StarContainer, StarIcon } from "./style";

interface Props {
    rating: number;
}

const DisplayRating = (p: Props) => {
    const maxRating = 5;
    const rating = p.rating;

    const clipPercentage = (idx: number) => {
        return 0 < rating - idx && rating - idx < 1
          ? (rating % 1) * 100
          : 100;
      };
    
    return (
        <StarContainer>
            {Array.from(Array(maxRating).keys()).map((idx) => (idx < rating &&
                <StarIcon fontSize="medium" key={idx} style={{
                    clipPath: `polygon(0 0, 0 100%, ${clipPercentage(idx)}% 100%, ${clipPercentage(idx)}% 0)`,
                }} />
            ))}
        </StarContainer>
    );
};

export default DisplayRating