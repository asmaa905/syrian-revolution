"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "../../css/componantUser/RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../../../context/Context";
import Joi from "joi";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
export default function RegisterUser() {
  const { setOpenAuth } = useContext(ContextUser);

  const [userUpdate, setUserUpdate] = useState({});
  const [errorListUpdate, setErrorListUpdate] = useState();
  const [success, setSuccess] = useState(false);
  const [data, setdata] = useState({});

  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const [imageProfile, setImageProfile] = useState("");

  const [loading, setLoading] = useState(false);
  function handleImg(e) {
    setImageProfile(e.target.files[0]);
  }

  const [docImageState, setDocImgState] = useState("");
  function handleImgDoc(e) {
    setDocImgState(e.target.files[0]);
  }

  function validationAddUser() {
    let schema = Joi.object({
      name: Joi.string().allow(""),
      username: Joi.string().allow(""),
      docImg: Joi.string().allow(""),
      email: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),
      government: Joi.string().allow(""),
      phone: Joi.string().min(7).max(15).allow("").messages({
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة ارقام",
        "string.max": "    رقم  الهاتف يجب الا يزيد عن  خمسة عشر رقم",
      }),
    });
    return schema.validate(userUpdate, { abortEarly: false });
  }
  /////////////////////get single user//////////////////
  async function getSingleUserUpdate() {
    await axios
      .get(
        `https://syrianrevolution1.com/users/single/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        setUserUpdate({
          name: result?.data?.name || "",
          government: result?.data?.government || "",
          phone: result?.data?.phone || "",
          selfImg: result?.data?.selfImg || "",
          username: result?.data?.username || "",
          email: result?.data?.email || "",
          docImg: result?.data?.docImg || "",
        });
        console.log(result);
        setdata(result?.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getSingleUserUpdate();
  }, []);

  async function handleSubmit(e) {
    setErrorListUpdate("");
    e.preventDefault();
    setSuccess(false);
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUpdate([responseValidateUser.error.details]);
    } else {
      setErrorListUpdate(null);
      const formData = new FormData();
      if (
        userUpdate.name !== "" &&
        userUpdate.name !== undefined &&
        userUpdate.name !== null
      ) {
        formData.append("name", userUpdate.name);
      }
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
        imageProfile !== null &&
        imageProfile !== undefined &&
        imageProfile !== ""
      ) {
        formData.append("selfImg", imageProfile);
      }
      if (
        docImageState !== null &&
        docImageState !== undefined &&
        docImageState !== ""
      ) {
        formData.append("docImg", docImageState);
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/users/${localStorage.getItem(
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
        setLoading(false);

        if (result?.user?.createdAt) {
          setSuccess(true);
          getSingleUserUpdate();
          localStorage.selfImg = result.user.selfImg;
        } else {
          if (result.includes("email")) {
            return alert("هذا الايميل موجود من قبل");
          } else if (result.includes("username")) {
            return alert("اسم المستخدم هذا موجود من قبل");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={style.RegisterUser}>
        <form
          className={style.forms}
          style={{ height: "60%", transform: "translateY(50px)" }}
        >
          <div className={style.headForm}>
            <h3 className="mb-[0.5rem]"> تحديث بيانات</h3>

            <FontAwesomeIcon
              icon="fa-solid fa-circle-xmark"
              style={{
                position: "absolute",
                top: "-20%",
                right: 0,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => setOpenAuth("")}
            />

            <hr className="m-[0.25rem_0]" />
          </div>
          {errorListUpdate &&
            errorListUpdate.map((error, index) => (
              <p
                key={index}
                className="alert alert-secondary alerthemself  translate-y-[30px]"
                style={{ width: "90%" }}
              >
                {error[index].message}
              </p>
            ))}
          {success && (
            <p
              className="alert alert-secondary alerthemself  translate-y-[30px]"
              style={{ width: "90%" }}
            >
              تم التحديث بنجاح
            </p>
          )}
          <div className={style.inform}>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> الاسم بالكامل</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="الاسم"
                  value={userUpdate?.name || ""}
                  onChange={handlechange}
                />
              </div>

              <div className={style.inpi}>
                <label htmlFor="">رقم الهاتف </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={userUpdate?.phone || ""}
                  onChange={handlechange}
                />
              </div>
            </div>

            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> المحافظة </label>
                <input
                  type="text"
                  className="form-control"
                  name="government"
                  placeholder="المحافظة"
                  value={userUpdate?.government}
                  onChange={handlechange}
                />
              </div>
              <div
                className={style.inpi}
                style={{ marginTop: "7px", display: "flex", gap: "10px" }}
              >
                <div>
                  {userUpdate?.selfImg && (
                    <Image
                      src={`https://syrianrevolution1.com/images/${userUpdate?.selfImg}`}
                      alt="profile"
                      priority={true}
                      width={50}
                      height={50}
                      // style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: "11px", marginBottom: "10px" }}>
                    تحميل صورة الملف الشخصي{" "}
                  </p>

                  <label
                    htmlFor="file-upload1"
                    className={style.customfileupload}
                  >
                    ارفع الصورة
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file-upload1"
                    name="selfImg"
                    onChange={handleImg}
                  />
                </div>
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> الايميل</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="الايميل"
                  value={userUpdate?.email || ""}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> اسم المستخدم </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="اسم المستخدم"
                  value={userUpdate?.username}
                  onChange={handlechange}
                />
              </div>
              <div
                className={style.inpi}
                style={{ marginTop: "7px", display: "flex", gap: "10px" }}
              >
                <div>
                  <img
                    src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                    alt="profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "11px", marginBottom: "10px" }}>
                    تحميل صورة الوثيقة الشخصية{" "}
                  </p>

                  <label
                    htmlFor="file-upload3"
                    className={style.customfileupload}
                  >
                    ارفع الوثيقة
                  </label>
                  {data.isConfident == true && (
                    <p
                      style={{
                        fontSize: "11px",
                        marginBottom: "10px",
                        color: "blue",
                      }}
                    >
                      وثيقتك تم تاكيدها من قبل ولا يمكنك التعديل عليها
                    </p>
                  )}
                  <input
                    type="file"
                    className="form-control"
                    id="file-upload3"
                    name="docImg"
                    onChange={handleImgDoc}
                    disabled={data.isConfident == true}
                  />
                </div>
              </div>
            </div>

            {data.role === "user" && (
              <Link
                href="/privateNewsUser"
                className="font-[400] text-[#0a58ca] text-[1rem] leading-[24px] underline pb-[5px]"
              >
                المنشورات الخاصة بي
              </Link>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%,50px)",
            }}
          >
            {loading ? (
              <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
              <span class="sr-only">Loading...</span>
            </div>
            ) : (
              "    تحديث بيانات"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
