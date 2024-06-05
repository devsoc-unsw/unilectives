"use client";

// Code Taken from https://nextjsdev.com/dark-mode-in-next-js-13-app-using-tailwind-css/ and modified

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

type Props = {
  children: string | React.ReactNode;
};

export default function ThemeProviderComponent({ children }: Props) {
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
