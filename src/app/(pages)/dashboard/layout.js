"use client";

import "../../globals.css";

import React, { useContext } from "react";

import style from "../../css/styleDashboard/HomeDashboard.module.css";
import AlertImageDash from "@/app/_Components/componantDashboard/AlertImageDash/AlertImageDash";
import LeftSideBar from "@/app/_Components/componantDashboard/LeftSideBar";
import { ContextUser } from "@/app/context/Context";
export default function DashboardLayout({ children }) {
  const { openAlert, openAlertStore } = useContext(ContextUser);
  return (
    <>
      <div className={style.HomeDashboard}>
        <LeftSideBar />

        <div className={style.centerDash}>{children}</div>
      </div>
      {openAlert && <AlertImageDash src={openAlertStore} />}
    </>
  );
}
