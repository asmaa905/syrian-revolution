"use client";
import styles from "../../css/styleDashboard/SuperVisor.module.css";
import { useContext } from "react";
import { ContextUser } from "@/app/context/Context";

export default function UsersDash() {
  ////////////////get current user role ///////////////////
  const { role } = useContext(ContextUser);
  return (
    <>
      <div className={` max-h-[200px] rounder-[3px]`}>
        <p className="text-blue-700 text-center p-[20px]  w-1/2 mx-auto">
          لوحة تحكم{" "}
          <span>
            {role == "admin" ? "الادمن" : role == "owner" ? "المالك" : "المشرف"}
          </span>
        </p>
      </div>
    </>
  );
}
