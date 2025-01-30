"use client";

import React, { useContext } from "react";
import style from "../../../css/componantDashboard/AlertImageDash/AlertImageDash.module.css";
import { saveAs } from "file-saver";
import { ContextUser } from "@/app/context/Context";

export default function AlertImageDash({ src }) {
  const { setOpenAlert } = useContext(ContextUser);

  function saveFile(e) {
    e.preventDefault();
    saveAs(src, "downloaded_file");
  }

  // Check if the file is an image or a PDF
  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(src);
  const isPDF = /\.pdf$/i.test(src);

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <div className={style.informSuccess}>
          {isImage ? (
            <img
              src={src}
              alt="martyr or detainee"
              className={style.previewImage}
            />
          ) : isPDF ? (
            <iframe
              src={src}
              className={style.previewPDF}
              title="PDF Preview"
            ></iframe>
          ) : (
            <>
            <img
            src={src}
            alt="martyr or detainee"
            className={style.previewImage}
          />
            <p>نوع الملف غير مدعوم</p>
            </>
          )}

          <div className={style.btnInpu}>
            <button onClick={() => setOpenAlert(false)}>اغلاق</button>
          </div>
          <div className={style.btnInpu}>
            <button onClick={saveFile}>تنزيل</button>
          </div>
        </div>
      </form>
    </div>
  );
}
