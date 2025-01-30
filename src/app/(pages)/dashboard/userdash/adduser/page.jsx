"use client";

import React, { useState } from "react";
import styles from "../../../../css/styleDashboard/AddSuperVisor.module.css";
import Joi from "joi";
import { useRouter } from "next/navigation";
export default function AddUser() {
  const router = useRouter();
  const [user, setUser] = useState({ role: "user" });
  const [errorListUser, setErrorListUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [imageProfile, setImageProfile] = useState("");
  const [imageDoc, setImageDoc] = useState("");

  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function handleChangeImageProfile(e) {
    const file = e.target.files[0];
    if (file) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (allowedImageTypes.includes(file.type)) {
        setImageProfile(file);
      } else {
        alert("يُسمح فقط بملفات الصور (JPEG, PNG, JPG, WEBP) للصورة الشخصية.");
        e.target.value = "";
      }
    }
  }

  function handleChangeImageDoc(e) {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "application/pdf",
      ];
      if (allowedTypes.includes(file.type)) {
        setImageDoc(file);
      } else {
        alert(
          "يُسمح فقط بملفات الصور (JPEG, PNG, JPG, WEBP) أو PDF للوثيقة الشخصية."
        );
        e.target.value = "";
      }
    }
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
      role: Joi.string().required(),
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
      formData.append("role", user.role);

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

        if (result.createdAt) {
          router.push("/dashboard/userdash");
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / أضافة مستخدم</p>
      </div>
      {errorListUser &&
        errorListUser.map((error, index) => (
          <p key={index} className="alert alert-secondary alerthemself">
            {error[index].message}
          </p>
        ))}
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor="">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                placeholder="اسم المستخدم"
                className="form-control"
                onChange={handlechange}
              />

              {errorBackUser &&
                errorBackUser?.message?.includes(
                  "E11000 duplicate key error collection: test.users index: username_1 dup key"
                ) && <p className={`error`}>هذا الاسم موجود من قبل</p>}
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم بالكامل </label>
              <input
                type="text"
                name="name"
                placeholder="     الاسم بالكامل "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                name="government"
                placeholder=" المحافظة "
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {" "}
                الصورة الشخصية (اختياري)
              </p>
              <label htmlFor="file-upload2" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="selfImg"
                id="file-upload2"
                type="file"
                className="form-control"
                onChange={handleChangeImageProfile}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> البريد الالكتروني</label>
              <input
                type="email"
                name="email"
                placeholder=" البريد الالكتروني"
                className="form-control"
                onChange={handlechange}
              />
              {errorBackUser && errorBackUser === "email already exist" && (
                <p className={`error`}>هذا الايميل موجود من قبل</p>
              )}
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                placeholder=" رقم الهاتف"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> كلمة المرور</label>
              <input
                name="password"
                type="password"
                placeholder="  كلمة المرور"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رمز الدخول </label>
              <input
                type="text"
                name="key"
                placeholder="     رمز الدخول "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.inp1}>
              <label>الدور</label>
              <select name="role" onChange={handlechange}>
                <option value="user">مستخدم</option>
                <option value="admin">ادمن</option>
                <option value="supervisor">مشرف</option>
              </select>
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {" "}
                الوثيقة الشخصية (اختياري)
              </p>
              <label htmlFor="file-upload3" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="docImg"
                id="file-upload3"
                type="file"
                className="form-control"
                onChange={handleChangeImageDoc}
              />
            </div>
          </div>
        </div>
      </form>
      <div className={styles.btnbottom}>
        <button
          className={`add`}
          style={{ color: "white", backgroundColor: "green" }}
          onClick={handleSubmit}
        >
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
            " اضافة"
          )}
        </button>
        <button
          className={`add`}
          style={{ border: "1px solid red", color: "red" }}
          onClick={() => router.back()}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
