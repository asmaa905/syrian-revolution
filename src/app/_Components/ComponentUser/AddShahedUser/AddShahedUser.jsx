"use client";
import { React, useContext, useEffect, useState } from "react";
import { ContextUser } from "../../../../context/Context";
import Joi from "joi";

export default function AddShahedUser() {
  const { setOpenAuth, getSingleUser, checkConfition } =
    useContext(ContextUser);

  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);

  const [addData, setAddData] = useState({
    category: "martyr",
    responsibleAuthority: "system",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);

  const [imageProfile, setImageProfile] = useState("");
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

  const [document, setDocument] = useState("");
  function handleChangeDocuments(e) {
    setDocument(e.target.files);
  }

  function handlechange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validationAddUser() {
    let schema = Joi.object({
      category: Joi.string().required().messages({
        "string.empty": "التصنيف  مطلوب",
        "any.required": "التصنيف  مطلوب",
      }),
      name: Joi.string().required().messages({
        "string.empty": "اسم الشهيد مطلوب",
        "any.required": "اسم الشهيد مطلوب",
      }),
      documents: Joi.string().allow(""),
      nickname: Joi.string().allow(""),
      dateOfBirth: Joi.string().allow(""),
      responsibleAuthority: Joi.string().required().messages({
        "string.empty": "الجهة المسؤولة مطلوبة",
        "any.required": "الجهة المسؤولة مطلوبة",
      }),
      governorate: Joi.string().allow(""),
      fatherName: Joi.string().allow(""),
      motherName: Joi.string().allow(""),
      place: Joi.string().allow(""),
      externalLinks: Joi.string().allow(""),
      details: Joi.string().allow(""),
    });
    return schema.validate(addData, { abortEarly: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else if (!localStorage.getItem("token")) {
      setOpenAuth("login");
    } else {
      if (checkConfition === true) {
        setErrorListUser("");
        setSuccessAdd(false);
        const formData = new FormData();
        formData.append("category", addData.category);
        formData.append("name", addData.name);
        formData.append("profileImage", imageProfile);
        if (Array.isArray(document)) {
          document.forEach((file) => {
            formData.append("documents", file);
          });
        } else if (document instanceof FileList) {
          for (let i = 0; i < document.length; i++) {
            formData.append("documents", document[i]);
          }
        }
        formData.append("nickname", addData.nickname);
        if (
          addData.dateOfBirth !== "" &&
          addData.dateOfBirth !== undefined &&
          addData.dateOfBirth !== null
        ) {
          formData.append("dateOfBirth", addData.dateOfBirth);
        }
        formData.append("responsibleAuthority", addData.responsibleAuthority);
        formData.append("governorate", addData.governorate);
        formData.append("fatherName", addData.fatherName);
        formData.append("motherName", addData.motherName);
        formData.append("place", addData.place);
        formData.append("externalLinks", addData.externalLinks);
        formData.append("details", addData.details);
        try {
          setLoading(true);
          const response = await fetch(
            `https://syrianrevolution1.com/childData/${localStorage.getItem(
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
      } else {
        setOpenAuth("faild");
      }
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p key={index} className="bg-secondary text-white p-2 rounded-md">
              {error[index].message}
            </p>
          ))}
        {errorBackUser && (
          <p className="bg-secondary text-white p-2 rounded-md">
            {errorBackUser?.error === "Cannot read property '0' of undefined"
              ? "يرجي رفع صورة للشهيد او صورة تدل علي الحدث"
              : errorBackUser?.error.includes("ChildData validation failed")
              ? "التاريخ غير صالح"
              : "يرجي رفع وثيقة تثبت الحدث"}
          </p>
        )}
        {successAdd && setOpenAuth("successaddinform")}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="name" className="text-sm">
                اسم الشهيد
              </label>
              <input
                type="text"
                id="name"
                placeholder="اسم الشهيد"
                className="p-2 border rounded"
                name="name"
                onChange={handlechange}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="fatherName" className="text-sm">
                اسم الاب
              </label>
              <input
                type="text"
                id="fatherName"
                placeholder="اسم الاب"
                className="p-2 border rounded"
                name="fatherName"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="nickname" className="text-sm">
                كنية الشهيد
              </label>
              <input
                type="text"
                id="nickname"
                placeholder="كنية الشهيد"
                className="p-2 border rounded"
                name="nickname"
                onChange={handlechange}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="motherName" className="text-sm">
                اسم الام
              </label>
              <input
                type="text"
                id="motherName"
                placeholder="اسم الام"
                className="p-2 border rounded"
                name="motherName"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="dateOfBirth" className="text-sm">
                المواليد
              </label>
              <input
                type="date"
                id="dateOfBirth"
                placeholder="المواليد"
                className="p-2 border rounded"
                name="dateOfBirth"
                onChange={handlechange}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="place" className="text-sm">
                مكان الحدث
              </label>
              <input
                type="text"
                id="place"
                placeholder="مكان الحدث"
                className="p-2 border rounded"
                name="place"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="responsibleAuthority" className="text-sm">
                الجهة المسؤولة
              </label>
              <select
                id="responsibleAuthority"
                name="responsibleAuthority"
                className="p-2 border rounded"
                onChange={handlechange}
              >
                <option value="system">النظام</option>
                <option value="daaeh">داعش</option>
                <option value="qasad">قسد</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="file-upload" className="text-sm">
                وثيقة أو ملف
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleChangeDocuments}
                multiple
                name="documents"
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="governorate" className="text-sm">
                المحافظة
              </label>
              <input
                type="text"
                id="governorate"
                placeholder="المحافظة"
                className="p-2 border rounded"
                name="governorate"
                onChange={handlechange}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="externalLinks" className="text-sm">
                رابط خارجي
              </label>
              <input
                type="text"
                id="externalLinks"
                placeholder="رابط خارجي"
                className="p-2 border rounded"
                name="externalLinks"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="file-upload1" className="text-sm">
              صورة (إجبارية)
            </label>
            <input
              type="file"
              id="file-upload1"
              onChange={handleChangeImageProfile}
              name="profileImage"
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="details" className="text-sm">
              شرح مفصل
            </label>
            <textarea
              name="details"
              id="details"
              onChange={handlechange}
              className="p-2 border rounded"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600"
          >
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "إضافة"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
