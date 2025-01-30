"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import profile_img from "../../../assets/images/profile_img.png";
import style from "../../css/styleDashboard/leftSideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

import {
  faArrowDown,
  faArrowRightFromBracket,
  faBell,
  faComment,
  faHouse,
  faImage,
  faOutdent,
  faReceipt,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { ContextUser, useUser } from "@/app/context/Context";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import AlertLogout from "./AlertImageDash/AlertLogout";

export default function LeftSideBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { numberMogrem } = useUser();
  const { role, setOpenLogout, openLogout } = useContext(ContextUser);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${style.LeftSideBar} max-h-[1200px] overflow-y-auto `}>
      <div
        className={`${style.first} flex justify-center items-center fles-wrap flex-col`}
        style={{
          cursor: "pointer",
          borderBottom: "1px solid #0d3a5a",
          textAlign: "center",
          paddingBottom: "5px",
        }}
      >
        {!isMobile ? (
          localStorage?.selfImg !== undefined &&
          localStorage?.selfImg !== "undefined" &&
          localStorage?.selfImg !== null &&
          localStorage?.selfImg !== "" ? (
            <img
              src={`https://syrianrevolution1.com/images/${localStorage?.selfImg}`}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img
              src={profile_img}
              alt="himself"
              style={{
                width: "40px",
                borderRadius: "40%",
                cursor: "pointer",
              }}
            />
          )
        ) : (
          ""
        )}
        <p>{role}</p>
      </div>
      <div className={style.second}>
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/userdash"
              className={pathname === "/dashboard/userdash" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faUserGroup} />
              المستخدمين
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" || role === "supervisor" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/history"
              className={pathname === "/dashboard/history" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faBell} />
              سجل الانشطة
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/message"
              className={pathname === "/dashboard/message" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faComment} />
              رسالة التوجية
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/paypal"
              className={pathname === "/dashboard/paypal" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faPaypal} />
              حساب بيبال
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/background"
              className={pathname === "/dashboard/background" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faImage} />
              الغلاف
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link
              href="/dashboard/privateNews"
              className={pathname === "/dashboard/privateNews" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faEye} />
              الاخبار الخاصة بي
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className={style.secondsecond}>
          <div className={style.headsecondsecond}>
            <Link href="#">
              {/* <a> */}
              <FontAwesomeIcon icon={faArrowDown} />
              {!isMobile ? <p>البيانات المستلمة</p> : ""}
              {/* </a> */}
            </Link>
          </div>

          <div className={style.listSecondSecond}>
            <Link
              href="/dashboard/martyrs"
              className={pathname === "/dashboard/martyrs" ? "active" : ""}
            >
              شهداء
            </Link>
            <Link
              href="/dashboard/detaineesdash"
              className={
                pathname === "/dashboard/detaineesdash" ? "active" : ""
              }
            >
              معتقلين
            </Link>
            <Link
              href="/dashboard/missingdash"
              className={pathname === "/dashboard/missingdash" ? "active" : ""}
            >
              مفقودين
            </Link>
            <div>
              <Link
                href="/dashboard/warcriminals"
                className={
                  pathname === "/dashboard/warcriminals" ? "active" : ""
                }
              >
                {" "}
                مجرمين حرب
              </Link>
              <span>{numberMogrem}</span>
            </div>
            <Link
              href="/dashboard/traitors"
              className={pathname === "/dashboard/traitors" ? "active" : ""}
            >
              عملاء
            </Link>
            <Link
              href="/dashboard/honorcard"
              className={pathname === "/dashboard/honorcard" ? "active" : ""}
            >
              {" "}
              بطاقات تكريم
            </Link>
            <Link
              href="/dashboard/lastnewsfromuser"
              className={
                pathname === "/dashboard/lastnewsfromuser" ? "active" : ""
              }
            >
              {" "}
              الأخبار{" "}
            </Link>
            {role === "owner" || role === "admin" ? (
              <Link
                href="/dashboard/wathaaqfromuser"
                className={
                  pathname === "/dashboard/wathaaqfromuser" ? "active" : ""
                }
              >
                {" "}
                وثائق{" "}
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={style.secondsecond}>
          <div className={style.headsecondsecond}>
            <Link href="#">
              {/* <a> */}
              <FontAwesomeIcon icon={faOutdent} />
              {!isMobile ? <p> ادخال البيانات</p> : ""}
              {/* </a> */}
            </Link>
          </div>

          <div className={style.listSecondSecond}>
            <Link
              href="/dashboard/lastnewsdash"
              className={pathname === "/dashboard/lastnewsdash" ? "active" : ""}
            >
              {" "}
              اخر الاخبار
            </Link>
            <Link
              href="/dashboard/revolutionarchivedash"
              className={
                pathname === "/dashboard/revolutionarchivedash" ? "active" : ""
              }
            >
              ارشيف الثورة
            </Link>
            <Link
              href="/dashboard/symbolsoftherevolution"
              className={
                pathname === "/dashboard/symbolsoftherevolution" ? "active" : ""
              }
            >
              رموز الثورة
            </Link>
            <Link
              href="/dashboard/blacklist"
              className={pathname === "/dashboard/blacklist" ? "active" : ""}
            >
              {" "}
              القائمة السوداء
            </Link>
            <Link
              href="/dashboard/crimessystem"
              className={
                pathname === "/dashboard/crimessystem" ? "active" : ""
              }
            >
              {" "}
              الملفات
            </Link>
            <Link
              href="/dashboard/allexcel"
              className={pathname === "/dashboard/allexcel" ? "active" : ""}
            >
              {" "}
              مطلوبين للنظام
            </Link>
          </div>
        </div>
        <div className={style.secondFourth}></div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link
              href="/dashboard/dataDisplaySite"
              className={
                pathname.startsWith("/dashboard/dataDisplaySite") ? "active" : ""
              }
            >
              <FontAwesomeIcon icon={faReceipt} />
              البيانات المعروضة بالموقع
            </Link>
          </div>
        </div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link href="/">
              {/* <a> */}
              <FontAwesomeIcon icon={faHouse} />
              الرئيسية
              {/* </a> */}
            </Link>
          </div>
        </div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link href="#" onClick={() => setOpenLogout(true)}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              تسجيل الخروج
            </Link>
          </div>
        </div>
      </div>
      {openLogout && <AlertLogout />}
    </div>
  );
}
