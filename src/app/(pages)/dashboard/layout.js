"use client";

import React, { useContext } from "react";
import style from "../../css/styleDashboard/HomeDashboard.module.css";
import ProtectedRouted from "@/app/_Components/componantDashboard/ProtectedRouted";
import AlertImageDash from "@/app/_Components/componantDashboard/AlertImageDash/AlertImageDash";
import LeftSideBar from "@/app/_Components/componantDashboard/LeftSideBar";
import { ContextUser } from "@/app/context/Context";

const DashboardLayout = ({ children }) => {
  const context = useContext(ContextUser);

  if (!context) {
    throw new Error("ContextUser must be used within a ContextUser.Provider");
  }

  const { openAlert, openAlertStore } = context;

  return (
    <ProtectedRouted>
      <div className={style.HomeDashboard}>
        <LeftSideBar />
        <div className={style.centerDash}>{children}</div>
      </div>
      {openAlert && <AlertImageDash src={openAlertStore} />}
    </ProtectedRouted>
  );
};

export default DashboardLayout;
