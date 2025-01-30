"use client";
import React, { useContext, useState } from "react";
import styles from "../../../../../css/styleDashboard/UpdateSuperVisor.module.css";
import { useRouter } from "next/navigation";
import Joi from "joi";
import { useEffect } from "react";
import axios from "axios";
import { ContextUser } from "@/app/context/Context";
export default function UpdateUser({ params }) {
  const router = useRouter();

  const [userUpdate, setUserUpdate] = useState({});
  const [errorListUpdate, setErrorListUpdate] = useState();
  const { setOpenAlert, setOpenAlertStore } = useContext(ContextUser);
  const { id } = React.use(params);

  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const isImage = (src) => {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(src);
  };
  const isPDF = (src) => {
    return /\.pdf$/i.test(src);
  };

  useEffect(() => {
    async function getSingleUser() {
      await axios
        .get(`https://syrianrevolution1.com/users/single/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          setUserUpdate({
            username: result.data.username || "",
            email: result.data.email || "",
            name: result.data.name || "",
            phone: result.data.phone || "",
            government: result.data.government || "",
            role: result.data.role || "",
            selfImg: result.data.selfImg || "",
            docImg: result.data.docImg || "",
          });
        })
        .catch((error) => console.log(error));
    }
    getSingleUser();
  }, []);

  const [imageProfile, setImageProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState("");

  function handleImg(e) {
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

  function handleDoc(e) {
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
        setDoc(file);
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
      name: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),
      docImg: Joi.string().allow(""),
      username: Joi.string().allow(""),
      email: Joi.string().allow(""),
      role: Joi.string().allow(""),
      government: Joi.string().allow(""),
      phone: Joi.string().min(7).allow("").messages({
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة ارقام",
      }),
    });
    return schema.validate(userUpdate, { abortEarly: false });
  }

  async function handleSubmit(e) {
    setErrorListUpdate("");
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUpdate([responseValidateUser.error.details]);
    } else {
      setErrorListUpdate(null);
      const formData = new FormData();
      if (
        userUpdate.username !== "" &&
        userUpdate.username !== undefined &&
        userUpdate.username !== null
      ) {
        formData.append("username", userUpdate.username);
      }
      if (
        userUpdate.email !== "" &&
        userUpdate.email !== undefined &&
        userUpdate.email !== null
      ) {
        formData.append("email", userUpdate.email);
      }
      if (
        userUpdate.name !== "" &&
        userUpdate.name !== undefined &&
        userUpdate.name !== null
      ) {
        formData.append("name", userUpdate.name);
      }
      if (
        userUpdate.phone !== "" &&
        userUpdate.phone !== undefined &&
        userUpdate.phone !== null
      ) {
        formData.append("phone", userUpdate.phone);
      }
      if (
        userUpdate.government !== "" &&
        userUpdate.government !== undefined &&
        userUpdate.government !== null
      ) {
        formData.append("government", userUpdate.government);
      }
      if (
        userUpdate.role !== "" &&
        userUpdate.role !== undefined &&
        userUpdate.role !== null
      ) {
        formData.append("role", userUpdate.role);
      }
      if (
        imageProfile !== null &&
        imageProfile !== undefined &&
        imageProfile !== ""
      ) {
        formData.append("selfImg", imageProfile);
      }
      if (doc !== null && doc !== undefined && doc !== "") {
        formData.append("docImg", doc);
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/users/${id}/${localStorage.getItem(
            "idUserLogin"
          )}`,
          {
            method: "PATCH",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const result = await response.json();
        if (result?.user?._id) {
          setLoading(false);
          router.push("/dashboard/userdash");
          //   getAllUserDashboard();
        } else {
          alert("الاسم او الايميل مستخدمين من قبل");

          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function openImage(src) {
    setOpenAlert(true);
    setOpenAlertStore(src);
  }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / تحديث بيانات</p>
      </div>
      <form action="" className={styles.form}>
        {errorListUpdate &&
          errorListUpdate.map((error, index) => (
            <p key={index} className="alert alert-secondary alerthemself">
              {error[index].message}
            </p>
          ))}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم </label>
              <input
                name="username"
                type="text"
                value={userUpdate.username || ""}
                placeholder="الاسم "
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الايميل </label>
              <input
                name="email"
                type="email"
                value={userUpdate.email || ""}
                placeholder="الايميل "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          {/* /////////////////// */}
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم بالكامل</label>
              <input
                name="name"
                type="text"
                value={userUpdate.name || ""}
                placeholder="الاسم بالكامل"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رقم الهاتف</label>
              <input
                name="phone"
                type="text"
                value={userUpdate.phone || ""}
                placeholder=" رقم الهاتف"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                name="government"
                type="text"
                placeholder=" المحافظة "
                className="form-control"
                onChange={handlechange}
                value={userUpdate.government || ""}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الدور</label>
              <select
                name="role"
                onChange={handlechange}
                value={userUpdate.role || ""}
              >
                <option value="">اختر الدور</option>
                <option value="admin">ادمن</option>
                <option value="supervisor">مشرف</option>
                <option value="user">مستخدم</option>
              </select>
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                الصورة الشخصية
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.oneDiv}>
                  {userUpdate?.selfImg !== undefined &&
                  userUpdate?.selfImg !== "undefined" &&
                  userUpdate?.selfImg !== null &&
                  userUpdate?.selfImg !== "" ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${userUpdate?.selfImg}`}
                      alt="profile"
                      onClick={() => {
                        openImage(
                          `https://syrianrevolution1.com/images/${userUpdate?.selfImg}`
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fsa"
                    style={{ width: "120px" }}
                    className={`customfileupload`}
                  >
                    {" "}
                    ارفع الملف{" "}
                  </label>
                  <input
                    name="selfImg"
                    id="fsa"
                    type="file"
                    className="form-control"
                    onChange={handleImg}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                الوثيقة الشخصية
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.oneDiv}>
                  {userUpdate?.docImg !== undefined &&
                  userUpdate?.docImg !== "undefined" &&
                  userUpdate?.docImg !== null &&
                  userUpdate?.docImg !== "" ? (
                    <>
                      {isImage(userUpdate?.docImg) ? (
                        <img
                          src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                          alt="document"
                          onClick={() =>
                            openImage(
                              `https://syrianrevolution1.com/images/${userUpdate?.docImg}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        />
                      ) : isPDF(userUpdate?.docImg) ? (
                        <div className="cursor-pointer  ">
                          <iframe
                            src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                            title="وثيقة"
                            style={{ cursor: "pointer", maxWidth: "100% " }}
                          ></iframe>
                        </div>
                      ) : (
                        <>
                          <img
                            src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                            alt="document"
                            onClick={() =>
                              openImage(
                                `https://syrianrevolution1.com/images/${userUpdate?.docImg}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                          <p>نوع الملف غير مدعوم</p>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col flex-start justify-start items-center">
                  <label
                    htmlFor="fsa1"
                    style={{ width: "120px" }}
                    className={`customfileupload`}
                  >
                    {" "}
                    ارفع الملف{" "}
                  </label>
                  <input
                    name="photo"
                    id="fsa1"
                    type="file"
                    className="form-control"
                    onChange={handleDoc}
                  />
                  {userUpdate?.docImg !== undefined &&
                    userUpdate?.docImg !== "undefined" &&
                    userUpdate?.docImg !== null &&
                    userUpdate?.docImg !== "" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any default behavior
                          openImage(
                            `https://syrianrevolution1.com/images/${userUpdate?.docImg}`
                          );
                        }}
                        className={`text-blue-700 underline cursor-pointer  text-[12px]`}
                      >
                        عرض الوثيقة
                      </button>
                    )}
                </div>
              </div>
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
            <div className="spinner-border text-secondary" role="status">
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
              <span className="sr-only"></span>
            </div>
          ) : (
            "    تحديث"
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
