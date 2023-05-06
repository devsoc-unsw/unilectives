export const HomeText = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="justify-center items-center pl-0 w-full pt-standard">
        <div className="flex flex-row w-full justify-between gap-[10px] mt-[15em]">
          <div className="flex flex-col gap-[10px] ml-[18em]">
            <p className="whitespace-no-wrap items-center justify-center drop-shadow-md italic font-lato">
              CSESoc presents
            </p>
            <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold text-7xl text-unilectives_blue">
              uni-lectives
            </p>
            <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold">
              Your one-stop shop for UNSW course and elective reviews.
            </p>
          </div>
          <div className="flex flex-row mr-0 gap-px items-center justify-center mr-[18em]">
            <button className="px-[28px] py-[13px] rounded-3xl bg-unilectives_blue hover:bg-unilectives_blue2 hover:scale-[0.98]">
              <p className="whitespace-no-wrap items-center drop-shadow justify-center font-lato text-white font-semibold">
                Add a Review
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}