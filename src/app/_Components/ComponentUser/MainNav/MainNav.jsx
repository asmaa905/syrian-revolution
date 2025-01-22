"use client";

import React, { useState, useContext, useEffect } from "react";
import "../../../css/componantUser/MainNav/MainNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faWhatsapp,
  faInstagram,
  faTelegram,
  faTiktok,
  faSquareFacebook,
  faSquareTwitter,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

// import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";
// import RegisterUser from "../RegisterUser/RegisterUser";
// import LoginUser from "../LoginUser/LoginUser";
import { ContextUser } from "../../../../context/Context";
import SuccessRegister from "../SuccessRegister/SuccessRegister";
// import ForgetPassword from "../ForgetPassword/ForgetPassword";
// import RestNewPassword from "../../../js/componantUser/RestNewPassword/RestNewPassword";
// import imgone from "../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
// import UpdateLogin from "../UpdateLogin";


import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

///////////////////////////

export async function getAllNotificationDate(pageNot = 1) {
  return await axios.get(
    `https://syrianrevolution1.com/notifications?page=${pageNot}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
}

export default function MainNav() {
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [numberDate, setNumberDate] = useState(0);
  const {
    openAuth,
    setOpenAuth,
    notification,
    getNotification,
    number,
    pageNot,
    setPageNot,
  } = useContext(ContextUser);
  const router = useRouter();

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  const { data: dataData, refetch: refetchData } = useQuery(
    ["dates", pageNot],
    () => getAllNotificationDate(pageNot),
    {
      cacheTime: 1800000,
      enabled: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotification();
      refetchData();
      setNumberDate(dataData?.data?.data?.length || 0);
    }
  }, [dataData?.data?.data?.length, getNotification, refetchData, pageNot]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "option1":
        router.push("/searchlist");
        break;
      case "option2":
        router.push("/searchchild");
        break;
      case "option3":
        router.push("/searchmascers");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="max-w-screen-xlg mx-auto px-4 md:px-12">
        <div className="flex  py-3 items-center flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex justify-between items-center">
            <h1 className="m-0 text-lg font-bold">الثورة السورية</h1>
        
          </div>
          <div
            className="w-full md:w-2/3   flex flex-col md:flex-row justify-end gap-5 items-center "
          >

<div className="flex items-center  relative">
           <p
                className="m-0 px-4 py-2  cursor-pointer"
                onClick={() => setOpen(true)}
              >
                تواصل معنا
              </p>
              <div
                  className=" cursor-pointer ms-2"
                  onClick={() => setOpenNoti(true)}
                >
                  
                  <FontAwesomeIcon icon={["fa-regular" ,"fa-bell"]} />
                </div>
           </div>
            <div className="flex justify-between items-center relative">
              {open &&   <div className="absolute md:left-[140px]   bg-[#3035a1] text-white text-lg rounded-md flex items-center  p-2">
      <a
        href="https://api.whatsapp.com/send/?phone=4917676000731"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={["fa-regular", "comment-dots"]} />
      </a>
      <a
        href="https://whatsapp.com/channel/0029VadYk723LdQRWZRO4t3S"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <a
        href="https://www.instagram.com/syrian_revolut/"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        href="https://t.me/Syrian_Revolution7"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTelegram} />
      </a>
      <a
        href="https://www.tiktok.com/@syrian.revolution7"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTiktok} />
      </a>
      <a
        href="https://www.facebook.com/syrian.revolut1"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faSquareFacebook} />
      </a>
      <a
        href="https://x.com/syrian_revolut"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faSquareTwitter} />
      </a>
      <a
        href="https://youtube.com/@syrian.revolution7"
        target="_blank"
        className="text-white ml-2"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faSquareYoutube} />
      </a>
      <FontAwesomeIcon
        icon={["fa-regular", "circle-xmark"]}
        className="text-red-500 cursor-pointer ml-2"
        onClick={() => setOpen(false)}
      />
    </div>}
           
              <div className="relative">
                <span className="absolute -right-2 text-sm">
                  {numberDate && number
                    ? numberDate + number
                    : numberDate || number || ""}
                </span>
            
              </div>
            </div>
            <div className="w-full md:w-auto border rounded-md px-3">
              <select
                className="form-select w-full"
                onChange={handleSelectChange}
              >
                <option>ابحث عن</option>
                <option value="option1">
                  اخر الاخبار و الارشيف و الرموز والعملاء
                </option>
                <option value="option2">
                  الشهداء و المعتقلين و المفقودين
                </option>
                <option value="option3"> الملفات</option>
              </select>
            </div>
            <div className="flex items-center">
              {localStorage.getItem("token") ? (
                <div className="flex items-center gap-4">
                  {localStorage?.selfImg ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${localStorage?.selfImg}`}
                      alt="himself"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={() => setOpenAuth("update")}
                    />
                  ) : (
                    "imgone"
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
                    onClick={() => setOpenAuth("register")}
                  >
                    انشاء حساب
                  </button>
                  <button
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded"
                    onClick={() => setOpenAuth("login")}
                  >
                    تسجيل الدخول
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {openNoti && (
          <div className={style.RegisterUser}>
            <div className={style.forms}>
              <div
                className={style.headForm}
                onClick={() => setOpenNoti(false)}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="absolute top-[-20%] right-1 text-red-600 cursor-pointer"
                />
              </div>
              <div className="p-3">
                <h4 className="text-red-600">
                  <i className="fa-regular fa-bell"></i> الإشعارات الجديدة
                </h4>
                {dataData?.data?.data?.length > 0 && (
                  <div>
                    <button
                      onClick={() => setPageNot((old) => old + 1)}
                      disabled={
                        dataData?.data?.data &&
                        !dataData?.data?.data.length
                      }
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        setPageNot((old) => Math.max(old - 1, 1))
                      }
                      disabled={pageNot === 1}
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                  </div>
                )}
                {dataData?.data?.data &&
                  dataData?.data?.data.length > 0 &&
                  dataData?.data?.data.map((notification) => (
                    <p key={notification.id}>{notification.message}</p>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
