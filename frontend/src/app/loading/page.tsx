"use client";

import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  // Animate progress smooth
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            window.location.href = "/api/auth/signin/csesoc";
          }, 500);
          return 100;
        }
        return oldProgress + 2; // speed of fill
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-800 z-50">
      <Typography
        variant="h6"
        className="mb-12 text-center text-[#182525] dark:text-white font-semibold"
      >
        Redirecting you to CSESoc’s official login page…
      </Typography>

      {/* Blue pill*/}
      <Box sx={{ 
        width: "60%",
        maxWidth: 420,
        backgroundColor: "white",
        borderRadius: "50px",
        border: "1px solid #1E6FFF",
        padding: "4px",
        marginBottom: "50px",
        marginTop: "50px",
      }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 22,
            borderRadius: "50px",
            backgroundColor: "transparent",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1E6FFF",
              borderRadius: "50px",
              transition: "width 0.2s linear",
            },
          }}
        />
      </Box>

      {/* Footer text*/}
      <Typography
        variant="body2"
        className="mt-10 text-gray-500 dark:text-gray-300 text-sm text-center"
      >
        DevSoc is a student group and not affiliated with the University,
        Faculty, or School.
      </Typography>
    </div>
  );
}
