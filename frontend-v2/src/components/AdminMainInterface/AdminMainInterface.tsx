"use client"

import React, { useState } from 'react';

export default function AdminMainInterface() {
	const [selectObject, setSelectObject] = useState('rev');

	return (
		<div className="flex flex-col gap-6">
			{/* Reviews and Reports Tab */}
			<div className="flex flex-row w-full h-9 gap-4">
				<button
					className={selectObject === 'rev' ? "font-bold border-b border-black" : ""}
					onClick={() => setSelectObject('rev')}>
						Reviews
				</button>
				<button 
					className={selectObject === 'rep' ? "font-bold border-b border-black" : ""}
					onClick={() => setSelectObject('rep')}>
						Reports
				</button>
			</div>
			{/* Sort and View Options */}
			<div className="flex flex-row justify-between w-full">
				<button
					className=""
				>
					Sort: A-Z
				</button>
				<div className="flex flex-row">
					<button
						className=""
					>
						Sort: A-Z
					</button>
					<button
						className=""
					>
						Sort: A-Z
					</button>
				</div>
			</div>
			{/* Card Grid */}
			{/* <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center">
				d
			</div> */}
		</div>
    );
}
