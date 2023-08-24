"use client";

import { Switch } from "@headlessui/react";
import { useCallback, useState } from "react";

export default function ToggleSwitch({
  accessibleTitle,
  defaultValue,
  onChange,
}: {
  accessibleTitle: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(defaultValue || false);

  const handleOnChange = useCallback(() => {
    if (onChange) {
      onChange(!enabled);
    }
    setEnabled((prev) => !prev);
  }, [enabled, onChange]);

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={enabled}
        onChange={handleOnChange}
        className={`${
          enabled ? "bg-unilectives-blue" : "bg-unilectives-subheadings/20"
        }
            relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
      >
        <span className="sr-only">{accessibleTitle}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-4" : "translate-x-0"}
              pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
