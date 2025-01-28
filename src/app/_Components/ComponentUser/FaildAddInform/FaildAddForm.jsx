"use client";

import React, { useContext } from "react";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../../../context/Context";

export default function FaildAddInform() {
  const { setOpenAuth } = useContext(ContextUser);
  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          style={{
            margin: "20px 20px 0 0",
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => setOpenAuth("")}
        />
        <div className={style.informSuccess}>
          <FontAwesomeIcon
            icon="fa-solid fa-circle-exclamation"
            style={{
              color: "rgb(189, 94, 94)",
              fontSize: "40px",
              marginBottom: "20px",
            }}
          />
          <p> يرجي تويق حسابك لتتمكن من اضافة البيانات </p>

          <div className={style.btnInpu}>
            <button onClick={() => setOpenAuth("tawsicEmail")}>
              {" "}
              توثيق الحساب
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
