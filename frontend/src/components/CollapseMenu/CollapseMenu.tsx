"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import TruncatedDescription from "@/components/TruncatedDescription/TruncatedDescription";

export default function CollapseMenu({
	preview,
	content,
	contentMaxCharacters
}: {
	preview: string,
	content: string,
	contentMaxCharacters?: number | null
}) {	
	return (
		<Disclosure as="div">
      <Disclosure.Button className="flex flex-row w-full justify-between items-center py-2 px-4 border border-gray-400 rounded-lg">
        <span className="font-bold">
					<TruncatedDescription
						content={preview}
						maxCharacters={250}
					/>
				</span>
				<ChevronDownIcon className="h-4 w-4 text-gray-700" />
      </Disclosure.Button>
      <Disclosure.Panel className="px-4 py-2 text-gray-500">
        <TruncatedDescription
					content={content}
					maxCharacters={250}
				/>
      </Disclosure.Panel>
    </Disclosure>
	)
}