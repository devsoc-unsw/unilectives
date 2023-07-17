"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
		<Disclosure>
      <Disclosure.Button className="flex flex-row justify-between items-center py-2 px-4 border border-gray-400 rounded-lg">
        <span className="font-bold">{preview}</span>
				<ChevronDownIcon className="h-4 w-4 text-gray-700" />
      </Disclosure.Button>
      <Disclosure.Panel className="px-4 border-gray-400 rounded-lg text-gray-500">
        {content}
      </Disclosure.Panel>
    </Disclosure>
	)
}