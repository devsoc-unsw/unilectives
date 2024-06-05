import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  tooltip?: string;
};

export default function Tooltip({ children, tooltip }: TooltipProps) {
  return (
    <div className='group relative inline-block'>
      {children}
      {tooltip && (
        <div
          className='
          scale-0 group-hover:scale-100
          absolute left-full top-1/2 transform -translate-y-1/2 ml-1
          whitespace-nowrap'
        >
          <div className='relative'>
            <div
              className='
              absolute right-full top-1/2 transform -translate-y-1/2
              w-0 h-0 border-t-4 border-t-transparent border-r-8 border-b-4 border-b-transparent border-r-white dark:border-r-slate-800'
            />
            <span className='py-2 px-4 text-sm text-black dark:text-white whitespace-nowrap rounded-md bg-white dark:bg-slate-800 shadow-lg dark:shadow-gray-700'>
              {tooltip}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
