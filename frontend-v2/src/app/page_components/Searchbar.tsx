export const Searchbar = () => {
  return (
    <div className="flex flex-col space-between">
      <div className="flex overflow-hidden flex-row mt-[2em] ml-[18em] mr-[18em] rounded-full border-2 border-unilectives_blue">
        <section className="flex flex-row space-between w-full h-10">
          <span className="w-[3em] h-[3em]">
            <img className="p-[0.9em]" src="/images/search-icon.svg" />
          </span>
          <input type="text" className="w-full h-full bg-slate-0 placeholder:italic placeholder-unilectives_blue focus:outline-none"
            placeholder="Search for a course e.g. COMP1511"></input>
        </section>
      </div>
    </div>
  )
}