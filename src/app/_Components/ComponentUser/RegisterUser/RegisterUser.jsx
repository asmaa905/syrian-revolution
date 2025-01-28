"use client";

import React, { useContext, useState } from "react";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../../../../context/Context";
import Joi from "joi";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function RegisterUser() {
  const { setOpenAuth } = useContext(ContextUser);
  ///////////////////////////
  const [user, setUser] = useState({});
  const [errorListUser, setErrorListUser] = useState(null);
  const [show, setShow] = useState(false);

  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const [imageProfile, setImageProfile] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

  const [imageDoc, setImageDoc] = useState("");
  function handleChangeImageDoc(e) {
    setImageDoc(e.target.files[0]);
  }

  function validationAddUser() {
    let schema = Joi.object({
      username: Joi.string().required().messages({
        "string.empty": "الاسم  مطلوب",
        "any.required": "الاسم  مطلوب",
      }),
      name: Joi.string().required().messages({
        "string.empty": "الاسم بالكامل مطلوب",
        "any.required": "الاسم بالكامل مطلوب",
      }),
      docImg: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),

      email: Joi.string()
        .email({ tlds: ["com", "not", "org"] })
        .required()
        .messages({
          "string.empty": "الايميل  مطلوب",
          "string.email": "الايميل غير صالح",
          "any.required": " الايميل مطلوب",
        }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "  كلمة المرور مطلوبة",
        "string.min": "  كلمة المرور يجب الا تقل عن 6 احرف",

        "any.required": "  كلمة المرور مطلوبة",
      }),
      government: Joi.string().required().messages({
        "string.empty": "   المحافظة مطلوبة",
        "any.required": "   المحافظة مطلوبة",
      }),
      phone: Joi.string().min(7).required().messages({
        "string.empty": "    رقم الهاتف مطلوب",
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة احرف",

        "any.required": "    رقم الهاتف مطلوب",
      }),
      key: Joi.string().required().messages({
        "string.empty": "    رمز الدخول  مطلوب",
        "any.required": "     ركز الدخول مطلوب",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser(null);
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("name", user.name);
      formData.append("selfImg", imageProfile);
      formData.append("docImg", imageDoc);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("government", user.government);
      formData.append("phone", user.phone);
      formData.append("key", user.key);
      try {
        setLoading(true);
        const response = await fetch(
          "https://syrianrevolution1.com/users/register",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        setLoading(false);
        console.log(result);
        if (result.createdAt) {
          setOpenAuth("successRegister");
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={style.RegisterUser}>
        <form className={style.forms} onSubmit={handleSubmit}>
          <div className={style.headForm}>
            <h6 className="mb-[0.5rem]">انشاء حساب</h6>
            <FontAwesomeIcon
              icon="fa-solid fa-circle-xmark"
              style={{
                position: "absolute",
                top: "-20%",
                right: "5px",
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => setOpenAuth("")}
            />

            <hr className="m-[0.25rem_0_1rem]" />
          </div>
          <div className={style.inform}>
            {errorListUser &&
              errorListUser.map((error, index) => (
                <p
                  style={{ width: "100%", transform: "translateY(5px)" }}
                  key={index}
                  className="alert alert-secondary alerthemself"
                >
                  {error[index].message}
                </p>
              ))}
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">اسم المستخدم</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="username"
                  placeholder="اسم المستخدم"
                />
                {errorBackUser &&
                  errorBackUser?.message?.includes(
                    "E11000 duplicate key error collection: test.users index: username_1 dup key"
                  ) && <p className={`error`}>هذا الاسم موجود من قبل</p>}
                {/* {errorBackUser && errorBackUser?.message && (
                  <p className={`error`}>هذا الاسم موجود من قبل</p>
                )} */}
              </div>
              <div className={style.inpi}>
                <label htmlFor="">رقم الهاتف </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="phone"
                  placeholder=" رقم الهاتف"
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> الاسم بالكامل (ثلاثي)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="name"
                  placeholder=" الاسم بالكامل"
                />
              </div>
              <div className={style.inpi}>
                <label htmlFor=""> المحافظة </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="government"
                  placeholder=" المحافظة"
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">البريد الالكتروني </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handlechange}
                  name="email"
                  placeholder=" الايميل"
                />
                {errorBackUser && errorBackUser === "email already exist" && (
                  <p className={`error`}>هذا الايميل موجود من قبل</p>
                )}
              </div>
              <div className={style.inpi}>
                <label htmlFor="">كلمة المرور </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handlechange}
                  placeholder="  كلمة المرور"
                />
              </div>
            </div>

            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">
                  {" "}
                  رمز الدخول (احتفظ به في حالة نسيت كلمة المرور){" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  onChange={handlechange}
                  name="key"
                  placeholder=" رمز الدخول"
                />
              </div>
            </div>

            <div className={style.picture}>
              <div className={style.pictureText}>
                <p>تحميل صورة الملف الشخصي (اختياري)</p>
              </div>
              <div className={style.pictureInput}>
                <label htmlFor="file" className={style.customfileupload}>
                  {/* <label
                  htmlFor="file-upload1"
                  className={style.customfileupload}
                > */}
                  ارفع الملف
                </label>
                <input
                  type="file"
                  className={`form-control ${style.fileInput}`}
                  id="file-upload1"
                  name="selfImg"
                  onChange={handleChangeImageProfile}
                />
              </div>
            </div>
            <div className={style.picture}>
              <div className={style.pictureText}>
                <p>
                  {" "}
                  تحميل صورة الوثيقة اختياري للحسابات الموثقة..للاطلاع علي
                  التفاصيل{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setShow((e) => !e)}
                  >
                    اضغط هنا
                  </span>{" "}
                </p>
                {show && (
                  <small className={style.small}>
                    <span style={{ color: "red" }}>ملحوظة</span> : هذة الوثيقة
                    مطلوبة لانك نعد من المشاركين في الموقع وليست لاغراض سياسية
                  </small>
                )}
              </div>
              <div className={style.pictureInput}>
                <label
                  htmlFor="file-upload5"
                  className={style.customfileupload}
                >
                  ارفع الوثيقة
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file-upload5"
                  name="docImg"
                  onChange={handleChangeImageDoc}
                />
              </div>
            </div>
            <div
              className={style.btnInpu}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn btn-primary"
                style={{ width: "30%", margin: "auto", padding: "10px 0" }}
                onClick={handleSubmit}
              >
                {loading ? (
                       <div role="status" className="text-[24px]">
                                                <FontAwesomeIcon
                                                  icon={faSpinner}
                                                  spin
                                                  className="h-5 w-5 text-secondary"
                                                />
                                                <span className="sr-only">Loading...</span>
                                              </div> 
                //   <div role="status">
                //   <svg
                //     aria-hidden="true"
                //     class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                //     viewBox="0 0 100 101"
                //     fill="none"
                //     xmlns="http://www.w3.org/2000/svg"
                //   >
                //     <path
                //       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                //       fill="currentColor"
                //     />
                //     <path
                //       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                //       fill="currentFill"
                //     />
                //   </svg>
                //   <span class="sr-only">Loading...</span>
                // </div>
                ) : (
                  "انشاء حساب"
                )}
              </button>
              <button
                className="btn"
                style={{ border: "none", outline: "none" }}
                onClick={() => setOpenAuth("login")}
              >
                لدي حساب بالفعل
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
