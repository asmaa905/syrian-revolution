"use client";

import React, { useContext } from "react";
import styles from "../../../css/componantDashboard/History/History.module.css";

import axios from "axios";
import { useQuery } from "react-query";
import { getAllHistory } from "./MainHistory";

import { useRouter } from "next/navigation";
import { ContextUser } from "@/app/context/Context";
export default function AllHistory() {
  ///////////////////////////////////
  const { page } = useContext(ContextUser);
  ////////////////////////////
  const { data, isLoading, refetch } = useQuery(
    ["historyData", page],
    () => getAllHistory(page),
    {
      keepPreviousData: true,
    }
  );

  /////////////////////
  const router = useRouter();
  async function handleDelete(id) {
    await axios
      .delete(`https://syrianrevolution1.com/sgel/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result?.data === "History Item Deleted Successfully") {
          refetch();
        }
      })
      .catch((error) => console.log(error));
  }
  if (isLoading)
    return (
      <div
        className="spinner-border"
        role="status"
        style={{ position: "absolute", left: "50%", top: "50%" }}
      >
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <>
      <div className={styles.AllHistory}>
        {data?.data?.data.length > 0 &&
          data?.data?.data
            .filter((e) =>
              e?.upUser
                ? e.upUser?.role === "admin" || e?.upUser?.role === "supervisor"
                : e?.user
                ? e?.user?.role === "admin" ||
                  e?.user?.role === "supervisor" ||
                  e?.user?.role === "user"
                : e?.data?.role === "admin" ||
                  e?.data?.role === "supervisor" ||
                  e?.data?.role === "user"
            )
            .map((e, i) => (
              <div className={styles.oneNotific} key={i}>
                <p>
                  قام{" "}
                  {e?.upUser
                    ? e?.upUser?.role === "user"
                      ? "المستخدم"
                      : e?.upUser?.role === "admin"
                      ? "الادمن"
                      : e?.upUser?.role === "supervisor"
                      ? "المشرف"
                      : e?.upUser?.role === "owner"
                      ? "المالك"
                      : ""
                    : e?.user
                    ? e?.user?.role === "user"
                      ? "المستخدم"
                      : e?.user?.role === "admin"
                      ? "الادمن"
                      : e?.user?.role === "supervisor"
                      ? "المشرف"
                      : e?.user?.role === "owner"
                      ? "المالك"
                      : ""
                    : e?.data?.role === "user"
                    ? "المستخدم"
                    : e?.data?.role === "admin"
                    ? "الادمن"
                    : e?.data?.role === "supervisor"
                    ? "المشرف"
                    : e?.data?.role === "owner"
                    ? "المالك"
                    : ""}{" "}
                  <span style={{ color: "#2d2dc3", margin: "0 2px" }}>
                    {e?.upUser
                      ? e?.upUser?.username
                      : e?.user
                      ? e?.user.username
                      : e?.data?.name}
                  </span>
                  <span>
                    {
                      e?.type === "register user success" ? (
                        "بانشاء حساب جديد"
                      ) : e?.type === "user login" ? (
                        "بستجيل دخول"
                      ) : e?.type === "delete user" ? (
                        <>
                          بحذف
                          {e?.data?.role === "user"
                            ? " المستخدم "
                            : e?.data?.role === "supervisor"
                            ? " المشرف "
                            : e?.data?.role === "admin"
                            ? " الادمن "
                            : ""}{" "}
                          <small style={{ color: "#2d2dc3" }}>
                            {e?.data?.username}
                          </small>
                        </>
                      ) : //////////////come back/////////////////
                      e?.type === "update user" ? (
                        "  بتحديث بياناتة"
                      ) : ////////////come back/////////////
                      e?.type === "update user docImg" ? (
                        <>
                          برفع صورة وثيقة ل{" "}
                          <small style={{ color: "#2d2dc3" }}>
                            {e?.data?.username}
                          </small>
                        </>
                      ) : e?.type === "user update password" ? (
                        "بتغييؤ كلمة المرور الخاصة بة"
                      ) : e?.type === "accept user doc" ? (
                        <>
                          بقبول وثيقة{" "}
                          <small>
                            {e?.data?.role === "admin"
                              ? "الادمن"
                              : e?.data?.role === "supervisor"
                              ? "المشرف"
                              : e?.data?.role === "user"
                              ? " المستخدم "
                              : e?.data?.role === "owner"
                              ? " المالك "
                              : ""}
                          </small>
                          <small>{e?.data?.username}</small>
                        </>
                      ) : ////////////////////background/////////////////////////
                      e?.type === "add background image" ? (
                        "بتغيير صورة الغلاف"
                      ) : //////////////////paypal and message//////////////////

                      e?.type === "add message" ? (
                        " باضافة رسالة توجية "
                      ) : e?.type === "update message" ? (
                        "بتحديث رسالة التوجية"
                      ) : e?.type === "add paypal" ? (
                        " باضافة حساب بيبال "
                      ) : e?.type === "update paypal" ? (
                        " بتحديث حساب بيبال "
                      ) : e?.type === "delete" ? (
                        " بحذف حساب بيبال "
                      ) : e?.type === "add desktop" ? (
                        " باضافة رابط تحميل التطبيق ايفون "
                      ) : e?.type === "add android" ? (
                        " بأضافة رابط تحميل التطبيق للاندرويد "
                      ) : ////////////////masscers /////////////////////

                      e?.type === "add massacres data post" ? (
                        "برفع منشور"
                      ) : e.type === "update massacres data post" ? (
                        " بتعديل منشور "
                      ) : e?.type === "delete massacres data post" ? (
                        <>
                          {" "}
                          بحذف منشور{" "}
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.title.slice(0, 40)}
                          </small>
                        </>
                      ) : /////////////////////////child////////////////////
                      e?.type === "add child data post" ? (
                        "برفع منشور"
                      ) : e.type === "update child data post" ? (
                        " بتعديل منشور "
                      ) : e?.type === "delete child data post" ? (
                        <>
                          {" "}
                          بحذف منشور{" "}
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.name.slice(0, 40)}
                          </small>
                        </>
                      ) : e?.type === "accept child data post" ? (
                        <>
                          {" "}
                          بقبول منشور{" "}
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.name.slice(0, 40)}
                          </small>
                        </>
                      ) : ////////////////list///////////////////////////////
                      e?.type === "add list data post" ? (
                        "برفع منشور"
                      ) : e.type === "updata list data post" ? (
                        " بتعديل منشور "
                      ) : e?.type === "delete list data post" ? (
                        <>
                          {" "}
                          بحذف منشور{" "}
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.name.slice(0, 40)}
                          </small>
                        </>
                      ) : e?.type === "accept list data post" ? (
                        <>
                          {" "}
                          بقبول منشور{" "}
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.name.slice(0, 40)}
                          </small>
                        </>
                      ) : ////////////////////////////
                      e?.type === "update user from dashboard" ? (
                        <>
                          بتحديث بيانات
                          <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                            {e?.data?.username}
                          </small>
                        </>
                      ) : (
                        ""
                      )
                      ////////////////////////
                    }
                  </span>
                </p>
                {/* /////////////////////user///////////////// */}
                {e?.type === "register user success" ||
                e?.type === "user login" ||
                e?.type === "update user" ||
                e?.type === "delete user" ||
                e?.type === "update user docImg" ||
                e?.type === "user update password" ||
                e?.type === "accept user doc" ||
                e?.type === "update user from dashboard" ? (
                  <div>
                    <button
                      className={styles.display}
                      onClick={() =>
                        router.push(`/dashboard/singleUser/${e?.data?._id}`)
                      }
                    >
                      عرض المستخدم
                    </button>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {/* //////////////message and paypal/////////////// */}
                {e?.type === "add message" ||
                e?.type === "update message" ||
                e?.type === "add paypal" ||
                e?.type === "update paypal" ||
                e?.type === "delete" ||
                e?.type === "add desktop" ||
                e?.type === "add android" ? (
                  <div>
                    <button
                      className={styles.display}
                      onClick={() =>
                        router.push(
                          `/dashboard/singlemessageandpaypal/${e?.data?._id}`
                        )
                      }
                    >
                      عرض المنشور
                    </button>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {/* //////////////////////masscers///////////////// */}
                {e?.type === "add massacres data post" ||
                e?.type === "update massacres data post" ||
                e?.type === "delete massacres data post" ? (
                  <div>
                    <button
                      className={styles.display}
                      onClick={() =>
                        router.push(
                          `/dashboard/dataDisplaySite/dataChildDisplaySitemascr/${e?.data?._id}`
                        )
                      }
                    >
                      عرض المنشور
                    </button>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {/* /////////////////child//////////////////////// */}

                {e?.type === "add child data post" ||
                e?.type === "delete child data post" ||
                e?.type === "accept child data post" ||
                e?.type === "update child data post" ? (
                  <div>
                    <button
                      className={styles.display}
                      onClick={() =>
                        router.push(
                          `/dashboard/dataDisplaySite/dataChildDisplaySite/${e?.data?._id}`
                        )
                      }
                    >
                      عرض المنشور
                    </button>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {/* /////////////////list////////////////// */}
                {e?.type === "add list data post" ||
                e?.type === "delete list data post" ||
                e?.type === "accept list data post" ||
                e?.type === "updata list data post" ? (
                  <div>
                    <button
                      className={styles.display}
                      onClick={() =>
                        router.push(
                          `/dashboard/dataDisplaySite/${e?.data?._id}`
                        )
                      }
                    >
                      عرض المنشور
                    </button>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}

                {e?.type === "add background image" ? (
                  <div>
                    <button
                      className={styles.display1}
                      onClick={() => handleDelete(e?._id)}
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
      </div>
    </>
  );
}
