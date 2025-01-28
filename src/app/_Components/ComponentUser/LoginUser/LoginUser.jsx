"use client";

import React, { useContext, useState } from "react";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../../../context/Context";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Joi from "joi";
import { getAllNotificationDate } from "../MainNav/MainNav";
import { useQuery } from "react-query";

export default function LoginUser() {
  const { setOpenAuth, setRole, getNotification, pageNot } =
    useContext(ContextUser);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorListUser, setErrorListUser] = useState(null);
  const [back, setBack] = useState(false);
  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  ///////////////////////////////
  const { refetch: refetchData } = useQuery(
    ["dates", pageNot],
    () => getAllNotificationDate(pageNot),
    {
      cacheTime: 1800000,
      enabled: false,
      keepPreviousData: true,
    }
  );
  ////////////valid Joi///////////////
  function validationAddUser() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: ["com", "not", "org"] })
        .required()
        .messages({
          "string.empty": "الايميل  مطلوب",
          "string.email": "الايميل غير صالح",
          "any.required": " الايميل مطلوب",
        }),
      password: Joi.string().required().messages({
        "string.empty": "  كلمة المرور مطلوبة",
        "any.required": "  كلمة المرور مطلوبة",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    let validate = validationAddUser();
    if (validate.error) {
      setErrorListUser([validate.error.details]);
    } else {
      setLoading(true);
      setErrorListUser("");
      await axios
        .post("https://syrianrevolution1.com/users/login", user)
        .then((result) => {
          if (result.data.message === "success") {
            const decodedToken = jwtDecode(result.data.token);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("idUserLogin", decodedToken.data.id);
            localStorage.setItem("roleUserLogin", decodedToken.data.role);
            localStorage.setItem("selfImg", result?.data?.user?.selfImg);
            setRole(localStorage.getItem("roleUserLogin"));
            getNotification();
            refetchData();
            setOpenAuth("");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          if (
            error?.response?.data?.msg === "Invalid Password" ||
            error?.response?.data?.msg === "invalid email"
          ) {
            setBack(true);
          }
        });
    }
  }
  return (
    <div className={style.RegisterUser}>
      <form className={style.formsLogin} onSubmit={handlesubmit}>
        <FontAwesomeIcon
          icon="fa-solid fa-circle-xmark"
          style={{
            marginRight: "15px",
            marginTop: "10px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => setOpenAuth("")}
        />
        <div
          className={style.headForm}
          style={{ width: "60%", marginTop: "-20px" }}
        >
          <h6 className="mb-[0.5rem]"> تسجيل الدخول</h6>

          <hr className="m-[1rem_0]" />
        </div>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ width: "60%", marginBottom: "20px" }}
            >
              {error[index].message}
            </p>
          ))}
        {back && (
          <p
            className="alert alert-secondary alerthemself"
            style={{ width: "60%", marginBottom: "20px" }}
          >
            البيانات غير صحيحة
          </p>
        )}
        <div className={style.inform3}>
          <div className={style.inpi2}>
            <label htmlFor=""> البريد الالكتروني </label>
            <input
              type="email"
              className=" form-control"
              name="email"
              onChange={handlechange}
              placeholder="البريد الالكتروني"
            />
          </div>

          <div className={style.inpi2}>
            <label htmlFor=""> كلمة المرور </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handlechange}
              placeholder="كلمة المرور"
            />

            <p
              onClick={() => setOpenAuth("forget")}
              style={{ cursor: "pointer" }}
            >
              هل نسيت كلمة المرور
            </p>
          </div>
          <div className={style.btnInpu}>
            <button type="submit" style={{ padding: "10px 0" }}>
              {" "}
              {loading ? (
                <div role="status">
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
              ) : (
                "تسجيل الدخول"
              )}
            </button>
            <button onClick={(e) => e.preventDefault()}>
              {" "}
              ليس لدي حساب .{" "}
              <span onClick={() => setOpenAuth("register")}>انشاء حساب</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
