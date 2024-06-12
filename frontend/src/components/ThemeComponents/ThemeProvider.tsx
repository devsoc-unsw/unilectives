"use client";

// Code Taken from https://nextjsdev.com/dark-mode-in-next-js-13-app-using-tailwind-css/ and modified

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

type Props = {
  children: string | React.ReactNode;
};

/**
 * Component that provides a theme to its child components.
 *
 * @param {Props} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the theme provider.
 * @returns {JSX.Element | null} - If page is mounted then show the page otherwise it will make browser show no content.
 */
export default function ThemeProviderComponent({ children }: Props): JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      {children}
    </ThemeProvider>
  );
}
