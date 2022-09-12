import React from "react"
import { Term, TermContainer } from "./style";

interface Props {
    terms: number[];
}

const DisplayTerms = (p: Props) => {
    return (
        <TermContainer>
            {p.terms.map((term) => (term != 0 ?
                <Term>Term {term}</Term>
                : <Term>Summer</Term>
            ))}
        </TermContainer>
    );
}


export default DisplayTerms