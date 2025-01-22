"use client";
import React, { useContext } from "react";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../../../../context/Context";
export default function SuccessRegister() {
  const { setOpenAuth } = useContext(ContextUser);
  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <div className={style.informSuccess}>
        <FontAwesomeIcon icon="fa-solid fa-circle-check"  style={{ color: "green", fontSize: "40px", marginBottom: "20px" }}/>

          <p>تم ارسال كافة البيانات بنجاح شكرا لانضمامك الينا</p>

          <div className={style.btnInpu}>
            <button onClick={() => setOpenAuth("")}> الرجوع للرئيسية</button>
          </div>
        </div>
      </form>
    </div>
  );
}
