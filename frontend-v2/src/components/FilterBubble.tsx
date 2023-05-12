type FilterBubbleProps = {
  colour: "faculty-blue" | "term-blue";
  filter: string;
}

export default function FilterBubble({colour, filter}: FilterBubbleProps) {
  if (colour != "faculty-blue" || "term-blue") return (<div></div>)
  return (
    <div className={`rounded-full py-3 px-6 bg-${colour}`}>
      {filter}
    </div>
  )
}