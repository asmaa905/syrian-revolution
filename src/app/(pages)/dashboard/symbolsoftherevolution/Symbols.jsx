"use client";

import React, { useState } from "react";
// import styles from "../../css/styleDashboard/Archief.module.css";
// import { useNavigate } from "react-router-dom";

import Joi from "joi";
import { useRouter } from "next/navigation";
export default function Black() {
  const router = useRouter();
  const [addData, setAddData] = useState({
    category: "symbols",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);

  const [imageProfile, setImageProfile] = useState("");
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

  function handlechange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validationAddUser() {
    let schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "     الاسم  مطلوب",
        "any.required": "     الاسم  مطلوب",
      }),
      category: Joi.string().required(),
      content: Joi.string().allow(""),
      governorate: Joi.string().allow(""),
      externalLinks: Joi.string().allow(""),
    });
    return schema.validate(addData, { abortEarly: false });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessAdd(false);
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser("");
      setSuccessAdd(false);
      const formData = new FormData();
      formData.append("name", addData.name);
      formData.append("selfImg", imageProfile);
      formData.append("externalLinks", addData.externalLinks);
      formData.append("governorate", addData.governorate);
      formData.append("category", addData.category);
      formData.append("content", addData.content);

      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/lists/${localStorage.getItem(
            "idUserLogin"
          )}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const result = await response.json();

        setLoading(false);
        if (result._id) {
          setSuccessAdd(true);
          setErrorBackUser(null);
          setErrorListUser(null);
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className='mt-[20px] mx-auto w-[80%]'>
      {errorListUser &&
        errorListUser.map((error, index) => (
          <p
            key={index}
            className="alretrevlotion"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            {error[index].message}
          </p>
        ))}
      {successAdd && (
        <p
          className="successrevlotion"
          style={{ transform: "translateY(0)", width: "100%" }}
        >
          تمت الاضافة بنجاح
        </p>
      )}
      {errorBackUser &&
        errorBackUser?.error === "Cannot read property '0' of undefined" && (
          <p
            className="alretrevlotion"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            يرجي رفع الصورة
          </p>
        )}
      <div className='containerinputrevloution'>
        <div className='inputrevloution'>
          <label htmlFor="" className="text-[12px]"> الاسم الرمز</label>
          <input
            type="text"
            className="form-control plachoderevloution"
            placeholder=" اسم الرمز "
            name="name"
            onChange={handlechange}
          />
        </div>
        <div className='inputrevloution'>
          <p style={{ fontSize: "10px", marginBottom: "5px" }}>صورة (اجباري)</p>
          <label htmlFor="f" className="fileuploadrevlotion">
            {" "}
            الصورة الشخصية
          </label>
          <input
            id="f"
            type="file"
            className="form-control plachoderevloution"
            name="selfImg"
            onChange={handleChangeImageProfile}
          />
        </div>
      </div>
      <div className='containerinputrevloution'>
        <div className='inputrevloution'>
          <label htmlFor="" className="text-[12px]"> المحافظة</label>
          <input
            type="text"
            className="form-control plachoderevloution"
            placeholder="المحافظة"
            name="governorate"
            onChange={handlechange}
          />
        </div>
        <div className='inputrevloution'>
          <label htmlFor="" className="text-[12px]">روابط خاريجية(يوتيوب)-اختياري</label>
          <input
            type="text"
            className="form-control plachoderevloution"
            placeholder="رابط خارجي"
            name="externalLinks"
            onChange={handlechange}
          />
        </div>
      </div>
      <div className='contentrevloution'>
        <label htmlFor="" className="text-[12px]"> المحتوي</label>
        <textarea
          name="content"
          id=""
          placeholder="المحتوي "
          className="form-control textervolution"
          onChange={handlechange}
        ></textarea>
      </div>

      <div className='btnsrevloution'>
        <button
          className={`addrevloution`}
          style={{ color: "white", backgroundColor: "green" }}
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            " اضافة"
          )}
        </button>
        <button
          className={`addrevloution`}
          style={{ border: "1px solid red", color: "red" }}
          onClick={() => router.push("/dashboard")}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
