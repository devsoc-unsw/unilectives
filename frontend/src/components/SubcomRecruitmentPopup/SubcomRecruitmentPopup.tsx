'use client';

import { useEffect } from "react";
import { notification } from "antd";

const SubcomRecruitmentPopup = () => {
  useEffect(() => {
    const lastShown = localStorage.getItem("popupLastShown");
    const now = new Date();
    const showPopup = !lastShown || new Date(lastShown).getTime() < now.getTime() - 24 * 60 * 60 * 1000;

    if (showPopup) {
      notification.info({
        message: 'Want to help build Unilectives?',
        description: (
          <span>
            Join our 2025 subcommittee! Applications are open now. Find out more at{' '}
            <a className = "text-blue-600 hover:text-blue-800" href="https://devsoc.app/get-involved" target="_blank" rel="noopener noreferrer">
              devsoc.app/get-involved
            </a>
          </span>
        ),
      });
      localStorage.setItem("popupLastShown", now.toString());
    }
  }, []);

  return null;
};

export default SubcomRecruitmentPopup;