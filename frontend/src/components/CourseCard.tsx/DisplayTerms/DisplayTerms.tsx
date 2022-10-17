import React from "react"
import { CardContentsExtras, CardContentsTag } from "./style";

interface Props {
    terms: number[];
}

const DisplayTerms = (p: Props) => {
    return (
        <div>
            {p.terms.map((term) => (term != 0 ?
                <CardContentsTag>Term {term}</CardContentsTag>
                : <CardContentsTag>Summer</CardContentsTag>
            ))}
        </div>
    );
}


export default DisplayTerms;
