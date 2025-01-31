"use client";

import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faTelegram,
  faTiktok,
  faSquareFacebook,
  faSquareTwitter,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import RegisterUser from "../RegisterUser/RegisterUser";
import LoginUser from "../LoginUser/LoginUser";
import { ContextUser } from "../../../context/Context";
import SuccessRegister from "../SuccessRegister/SuccessRegister";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import RestNewPassword from "../RestNewPassword/RestNewPassword";
import profile_img from "../../../../assets/images/profile_img.png";
import UpdateLogin from "../UpdateLogin";

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
      <div className="max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="flex  py-3 items-center flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex justify-between items-center">
            <h1 className="m-0   md:block hidden font-[500] text-[#212529] text-[24px] leading-[29px] ">
              الثورة السورية
            </h1>
          </div>
          <div className="w-full md:w-2/3   flex flex-col md:flex-row justify-end gap-5 items-center ">
            <div className="flex items-center  relative w-full md:w-fit">
              <div className="flex justify-between md:justify-end items-center w-full md:w-fit relative">
                <p
                  className="m-0 px-4 py-2  cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  تواصل معنا
                </p>
              </div>
              <div
                className=" cursor-pointer ms-2 text-[24px] notification relative"
                onClick={() => setOpenNoti(true)}
              >
                <FontAwesomeIcon icon={["fa-regular", "fa-bell"]} />
                <span className="absolute -right-2 text-sm">
                  {numberDate && number
                    ? numberDate + number
                    : numberDate || number || ""}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center  bg-gray-600">
              {open && (
                <div className="absolute md:right-[43%] md:top-[4%]  top-[11%] right-[10%]  bg-[#3035a1] text-white text-lg rounded-md flex items-center  p-2">
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
                </div>
              )}

              <div className="relative">
                {/* <span className="absolute -right-2 text-sm">
                  {numberDate && number
                    ? numberDate + number
                    : numberDate || number || ""}
                </span> */}
              </div>
            </div>
            <div className="w-full md:w-auto border rounded-md px-3">
              <select
                className="form-select border-none w-full outline-none"
                onChange={handleSelectChange}
              >
                <option>ابحث عن</option>
                <option value="option1">
                  اخر الاخبار و الارشيف و الرموز والعملاء
                </option>
                <option value="option2">الشهداء و المعتقلين و المفقودين</option>
                <option value="option3"> الملفات</option>
              </select>
            </div>
            <div className="flex items-center ms-auto">
              {localStorage.getItem("token") ? (
                <div className="flex items-center gap-4 me-auto">
                  {localStorage?.selfImg ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${localStorage?.selfImg}`}
                      alt="himself"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={() => setOpenAuth("update")}
                    />
                  ) : (
                    <Image
                      src={profile_img}
                      alt="himself"
                      width={40}
                      style={{
                        borderRadius: "40%",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenAuth("update")}
                    />
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 ">
                  <button
                    className="px-[12px] py-[6px]  bg-[#131434] text-white rounded"
                    onClick={() => setOpenAuth("register")}
                  >
                    انشاء حساب
                  </button>
                  <button
                    className="px-[12px] py-[6px]   text-[#131434] border border-[#131434] rounded"
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
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-[#00011C80] z-50">
            <div className="w-3/5 h-[77%] bg-[#F7F7F7] mx-auto rounded-md mt-4 overflow-auto">
              <div
                className="relative mx-auto text-center transform translate-y-5 w-[90%]"
                onClick={() => setOpenNoti(false)}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="absolute top-[-20%] right-1 text-red-600 cursor-pointer"
                />
              </div>
              <div className="relative top-8 mx-auto w-4/5 p-3 notification-body">
                <div className="new">
                  <h4 className="text-[#dc3545] text-[24px]">
                    <span className="text-[24px]">
                      <FontAwesomeIcon icon={["fa-regular", "fa-bell"]} />
                    </span>{" "}
                    الإشعارات الجديدة
                  </h4>
                  {dataData?.data?.data?.length > 0 ? (
                    <>
                      <button
                        onClick={() => setPageNot((old) => old + 1)}
                        disabled={
                          dataData?.data?.data && !dataData?.data?.data.length
                        }
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 me-2"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          setPageNot((old) => Math.max(old - 1, 1))
                        }
                        disabled={pageNot === 1}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        -
                      </button>
                    </>
                  ) : (
                    ""
                  )}

                  {dataData?.data?.data &&
                    dataData?.data?.data.length > 0 &&
                    dataData?.data?.data
                      .filter((e) => e?.data?.isAccepted === true)
                      .map((e, i) => (
                        <p
                          className="  note  relative bg-white p-2 ps-12  m-0 mb-2"
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <small> تمت اضافة منشور جديد بعنوان </small>
                            <small style={{ color: "#2d2dc3" }}>
                              {e?.type === "add child data post"
                                ? e?.data?.name.slice(0, 60)
                                : e?.type === "add list data post"
                                ? e?.data?.name.slice(0, 60)
                                : e?.type === "add massacres data post"
                                ? e?.data?.title.slice(0, 60)
                                : ""}
                            </small>
                            <small>
                              {" "}
                              (
                              {e?.data?.category === "lastNews"
                                ? "اخر الاخبار"
                                : e?.data?.category === "archiefthoura"
                                ? "ارشيف الثورة"
                                : e?.data?.category === "mozaharat"
                                ? "المظاهرات"
                                : e?.data?.category === "maarek"
                                ? "معارك الثوار"
                                : e?.data?.category === "symbols"
                                ? "رموز الثورة"
                                : e?.data?.category === "takrem"
                                ? "بطاقات التكريم"
                                : e?.data?.category === "blacklist"
                                ? "القائمة السوداء"
                                : e?.data?.category === "Traitors"
                                ? "العملاء"
                                : e?.data?.category === "mogramharb"
                                ? "مجرمين الحرب"
                                : e?.type === "add massacres data post"
                                ? "ملفات"
                                : e?.data?.category === "martyr"
                                ? "الشهداء"
                                : e?.data?.category === "adetaine"
                                ? "المعتقلين"
                                : e?.data?.category === "missing"
                                ? "المفقودين"
                                : ""}{" "}
                              ){" "}
                            </small>
                          </span>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              <>
                                {e?.type === "add child data post"
                                  ? router.push(
                                      `/NewsDetailsMartyr/${e?.data?._id}`
                                    )
                                  : e?.type === "add list data post"
                                  ? router.push(`/newsDetails/${e?.data?._id}`)
                                  : e?.type === "add massacres data post"
                                  ? router.push(
                                      `/NewsDetailsMascers/${e?.data?._id}`
                                    )
                                  : ""}
                                {setOpenNoti(false)}
                              </>;
                            }}
                          />
                        </p>
                      ))}
                  {notification?.child && notification?.child?.length > 0
                    ? notification?.child
                        .slice()
                        .reverse()
                        .map((e, i) => (
                          <p
                            className="  note  relative bg-white p-2 ps-12 m-0 mb-2"
                            key={i}
                          >
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  {notification?.lists && notification?.lists?.length > 0
                    ? notification?.lists
                        .slice()
                        .reverse()
                        .map((e, i) => (
                          <p
                            className=" note  relative bg-white p-2 ps-12 m-0 mb-2"
                            key={i}
                          >
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  {notification?.massacres &&
                  notification?.massacres?.length > 0
                    ? notification?.massacres
                        .slice()
                        .reverse()
                        .map((e, i) => (
                          <p
                            className="note  relative bg-white p-2 ps-12 m-0 mb-2"
                            key={i}
                          >
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  <p className=" note relative bg-white p-2 ps-12 m-0 mb-2">
                    {notification ? notification?.notification : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {openAuth === "register" && <RegisterUser />}
      {openAuth === "login" && <LoginUser />}
      {openAuth === "successRegister" && <SuccessRegister />}
      {openAuth === "forget" && <ForgetPassword />}
      {openAuth === "rest" && <RestNewPassword />} {/*when user logged**/}
      {openAuth === "return" && <RestNewPassword />}
      {/*when user logged**/}
      {openAuth === "update" && <UpdateLogin />}
    </>
  );
}
