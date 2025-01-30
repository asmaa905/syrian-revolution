"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "../../../../../css/styleDashboard/UpdateSuperVisor.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ContextUser } from "@/app/context/Context";

export default function SingleUser({ params }) {
  const [single, setSingle] = useState();
  const { setOpenAlert, setOpenAlertStore } = useContext(ContextUser);
  const { id } = React.use(params);

  const router = useRouter();
  const isImage = (src) => {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(src);
  };
  const isPDF = (src) => {
    return /\.pdf$/i.test(src);
  };

  useEffect(() => {
    async function getSingleUser() {
      try {
        const result = await axios.get(
          `https://syrianrevolution1.com/users/single/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSingle(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) getSingleUser();
  }, [id]);

  function openImage(src) {
    if (!src) {
      console.warn("No src provided to openImage");
      return;
    }
    console.log("Opening Image:", src);
    setOpenAlert(true); // Ensure this state update is triggering re-renders
    setOpenAlertStore(src);
  }

  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / عرض</p>
      </div>
      <div className={styles.singleUser}>
        <div className={styles.headInform}>
          <div>
            <h6>اسم المستخدم : </h6>
            <p> {single?.username} </p>
          </div>
          <div>
            <h6>الاسم بالكامل : </h6>
            <p> {single?.name} </p>
          </div>
          <div>
            <h6>البريد الالكتروني : </h6>
            <p> {single?.email} </p>
          </div>
          <div>
            <h6> المحافظة : </h6>
            <p> {single?.government} </p>
          </div>
          <div>
            <h6> رمز الدخول : </h6>
            <p> {single?.key} </p>
          </div>
          <div>
            <h6> الدور : </h6>
            <p> {single?.role} </p>
          </div>
        </div>
        <div className={styles.bottomInform}>
          <div className={styles.oneDiv}>
            <h6>صورة الملف الشخصي </h6>
            {single?.selfImg !== undefined &&
              single?.selfImg !== "undefined" &&
              single?.selfImg !== null &&
              single?.selfImg !== "" && (
                <img
                  src={`https://syrianrevolution1.com/images/${single?.selfImg}`}
                  alt="profile"
                  onClick={() =>
                    openImage(
                      `https://syrianrevolution1.com/images/${single?.selfImg}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                />
              )}
          </div>
          <div className={styles.oneDiv}>
            <h6>صورة الوثيقة </h6>
            {single?.docImg !== undefined &&
              single?.docImg !== "undefined" &&
              single?.docImg !== null &&
              single?.docImg !== "" && (
                <>
                  {isImage(single?.docImg) ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${single?.docImg}`}
                      alt="document"
                      onClick={() =>
                        openImage(
                          `https://syrianrevolution1.com/images/${single?.docImg}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ) : isPDF(single?.docImg) ? (
                    <div className="cursor-pointer flex flex-row justify-center items-start gap-[3px]">
                      <iframe
                        src={`https://syrianrevolution1.com/images/${single?.docImg}`}
                        title="وثيقة"
                        style={{ cursor: "pointer", maxWidth: "100% " }}
                      ></iframe>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any default behavior
                          openImage(
                            `https://syrianrevolution1.com/images/${single?.docImg}`
                          );
                        }}
                        className={`text-blue-700 underline cursor-pointer text-[12px] d-inline-block`}
                      >
                        عرض الوثيقة
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://syrianrevolution1.com/images/${single?.docImg}`}
                        alt="document"
                        onClick={() =>
                          openImage(
                            `https://syrianrevolution1.com/images/${single?.docImg}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <p>نوع الملف غير مدعوم</p>
                    </>
                  )}
                </>
              )}
          </div>
        </div>
        <div className={styles.btnbottom}>
          <button
            className="add"
            style={{ border: "1px solid red", color: "red" }}
            onClick={() => router.back()}
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
