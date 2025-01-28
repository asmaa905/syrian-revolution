"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "../../css/styleDashboard/leftSideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import AlertImageDash from "./AlertImageDash/AlertImageDash";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// const NavLink = ({ href, children, className }) => {
//   const router = useRouter();
//   // const isActive = typeof window !== "undefined" && router.pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`${className} ${isActive ? style.activeLink : ""}`}
//     >
//       {children}
//     </Link>
//   );
// };

export default function LeftSideBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { numberMogrem } = useUser();
  const { role, setOpenLogout, openLogout } = useContext(ContextUser);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.LeftSideBar}>
      <div className={style.first}>
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
                cursor: "pointer",
              }}
            />
          ) : (
            <>imgAvater</>
          )
        ) : (
          ""
        )}
        {/* (
            <img
              src={imgAvatar}
              alt="himself"
              style={{
                width: "40px",
                borderRadius: "40%",
                cursor: "pointer",
              }}
            />
          ) */}

        <p>{role}</p>
      </div>
      <div className={style.second}>
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/userdash">
              <FontAwesomeIcon icon={faUserGroup} />
              المستخدمين
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" || role === "supervisor" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/history">
              <FontAwesomeIcon icon={faBell} />
              سجل الانشطة
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/message">
              <FontAwesomeIcon icon={faComment} />
              رسالة التوجية
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/paypal">
              <FontAwesomeIcon icon={faPaypal} />
              حساب بيبال
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/background">
              <FontAwesomeIcon icon={faImage} />
              الغلاف
            </Link>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <Link href="/dashboard/privateNews">
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
            <Link href="/dashboard/martyrs">شهداء</Link>
            <Link href="/dashboard/detaineesdash">معتقلين</Link>
            <Link href="/dashboard/missingdash">مفقودين</Link>
            <div>
              <Link href="/dashboard/warcriminals"> مجرمين حرب</Link>
              <span>{numberMogrem}</span>
            </div>
            <Link href="/dashboard/traitors">عملاء</Link>
            <Link href="/dashboard/honorcard"> بطاقات تكريم</Link>
            <Link href="/dashboard/lastnewsfromuser"> الأخبار </Link>
            {role === "owner" || role === "admin" ? (
              <Link href="/dashboard/wathaaqfromuser"> وثائق </Link>
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
            <Link href="/dashboard/lastnewsdash"> اخر الاخبار</Link>
            <Link href="/dashboard/revolutionarchivedash">ارشيف الثورة</Link>
            <Link href="/dashboard/symbolsoftherevolution">رموز الثورة</Link>
            <Link href="/dashboard/blacklist"> القائمة السوداء</Link>
            <Link href="/dashboard/crimessystem"> الملفات</Link>
            <Link href="/dashboard/allexcel"> مطلوبين للنظام</Link>
          </div>
        </div>
        <div className={style.secondFourth}></div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link href="/dashboard/dataDisplaySite">
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
