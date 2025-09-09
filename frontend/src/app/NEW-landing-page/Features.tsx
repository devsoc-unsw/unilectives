export default function Features() {
  return (
    <div className="bg-[#EDEEEF] py-16 font-roboto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-normal text-center mb-12 ">Our Features</h2>

        <div className="flex flex-row md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-white rounded-xl shadow-md p-8 w-[398px] h-[483px]">
            <h3 className="text-xl font-semibold mb-4">Comprehensive Course Reviews</h3>
            <p className="text-black">
              Real student insights on difficulty, enjoyment, and teaching quality – all in one place.
            </p>
          </div>

          {/* Feature Box 2 (Using responsive Tailwind classes) */}
          <div className="bg-white rounded-xl shadow-md p-8 flex-1">
            <h3 className="text-xl font-semibold mb-4">Review Courses</h3>
            <p className="text-black">
              Share your experience to help fellow students make smarter study choices.
            </p>
          </div>

          {/* Feature Box 3 (Using responsive Tailwind classes) */}
          <div className="bg-white rounded-xl shadow-md p-8 flex-1">
            <h3 className="text-xl font-semibold mb-4">Your Account</h3>
            <p className="text-black">
              Save favorite courses, submit reviews, and personalise your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}