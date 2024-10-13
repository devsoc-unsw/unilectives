import Image from "next/image";
import Star from "@/assets/star.svg";

export default function BoxComponent({title, rating}: { title: string, rating: string }) {
  return (
    <div className='col-span-1 row-span-1 border rounded-lg text-center'>
      <div className='border-[0.5px] border-dashed m-5 p-5 rounded-lg'>
        <div
          className='text-8xl font-bold text-white font-inter flex items-center gap-3 justify-center tracking-wide mb-5'>
          {rating}
          <Image src={Star} alt={"Star Icon"} className={'w-20 h-20 text-white'}/>
        </div>
        <h1 className='text-3xl font-medium text-white font-neuemetana uppercase'>{title}</h1>
      </div>
    </div>
  )
}