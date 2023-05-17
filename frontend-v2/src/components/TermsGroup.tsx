export default function TermsGroup({ terms }: { terms: number[] }) {
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
      {termsObj.summer && (
        <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
          Summer
        </span>
      )}
      {termsObj.term1 && (
        <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
          Term 1
        </span>
      )}
      {termsObj.term2 && (
        <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
          Term 2
        </span>
      )}
      {termsObj.term3 && (
        <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
          Term 3
        </span>
      )}
    </div>
  );
}
