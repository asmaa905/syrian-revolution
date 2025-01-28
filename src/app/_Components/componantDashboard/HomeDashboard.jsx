"use client";

import "../../globals.css";
import React, { useContext } from "react";
import style from "../../css/styleDashboard/HomeDashboard.module.css";


import { ContextUser } from "@/app/context/Context";
import LeftSideBar from "./LeftSideBar";
import AlertImageDash from "./AlertImageDash/AlertImageDash";

const HomeDashboard = ({ children }) => {
  const { openAlert, openAlertStore } = useContext(ContextUser);

  return (
    <div className={style.HomeDashboard}>
      <LeftSideBar />
      <div className={style.centerDash}>{children}</div>
      {openAlert && <AlertImageDash src={openAlertStore} />}
    </div>
  );
};

export default HomeDashboard;
