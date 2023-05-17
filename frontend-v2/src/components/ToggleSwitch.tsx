import { Switch } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";

export default function ToggleSwitch({
  defaultValue,
  onChange,
}: {
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(defaultValue || false);

  const handleOnChange = useCallback(() => {
    setEnabled((prev) => !prev);
    if (onChange) {
      onChange(!enabled);
    }
  }, [enabled]);

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
        <span className="sr-only">Text only reviews</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-4" : "translate-x-0"}
              pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span>Text only reviews</span>
    </div>
  );
}
