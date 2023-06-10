import { HTMLAttributes } from "react";

export default function TermsGroup({
  terms,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { terms: number[] }) {
  // Map array to object
  const termsObj = terms.reduce(
    (result: Record<string, boolean>, index: number) => {
      const termsArray = ["summer", "term1", "term2", "term3"];
      if (!result[termsArray[index]]) result[termsArray[index]] = true;
      return result;
    },
    {}
  );

  return (
    <div className="flex flex-wrap gap-2">
      {termsObj.summer && <span {...props}>Summer</span>}
      {termsObj.term1 && <span {...props}>Term 1</span>}
      {termsObj.term2 && <span {...props}>Term 2</span>}
      {termsObj.term3 && <span {...props}>Term 3</span>}
    </div>
  );
}