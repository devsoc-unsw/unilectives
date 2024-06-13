"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/Tooltip/Tooltip";

/**
 * Renders a theme switcher component.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.collapsed - Indicates whether the theme switcher is collapsed.
 * @returns {JSX.Element | null} The rendered theme switcher component or null if not mounted.
 */

export default function ThemeSwitcher({ collapsed }: { collapsed: boolean }): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const { systemTheme, theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      // Change theme-color meta tag to slate-800 color when dark mode
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', '#1e293b')
    } else {
      // Change theme-color meta tag to white when light mode
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', '#ffffff')
    }
  }, [resolvedTheme])

  if (!mounted) {
    return null;
  }

  /**
   * Renders the theme changer component based on the current theme.
   * @returns The rendered theme changer component.
   */
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
