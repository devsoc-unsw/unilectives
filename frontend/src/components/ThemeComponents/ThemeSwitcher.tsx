"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip/Tooltip";

interface ThemeSwitcherProps {
  collapsed: boolean;
}

export default function ThemeSwitcher({ collapsed }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    const iconProps = {
      className:
        "w-12 h-12 p-3 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800",
      role: "button",
      onClick: () => setTheme(currentTheme === "dark" ? "light" : "dark"),
    };

    if (currentTheme === "dark") {
      return collapsed ? (
        <Tooltip tooltip='Light Mode'>
          <SunIcon {...iconProps} className={`${iconProps.className}`} />
        </Tooltip>
      ) : (
        <SunIcon {...iconProps} className={`${iconProps.className}`} />
      );
    } else {
      return collapsed ? (
        <Tooltip tooltip='Dark Mode'>
          <MoonIcon {...iconProps} className={`${iconProps.className}`} />
        </Tooltip>
      ) : (
        <MoonIcon {...iconProps} className={`${iconProps.className}`} />
      );
    }
  };

  return <>{renderThemeChanger()}</>;
}
