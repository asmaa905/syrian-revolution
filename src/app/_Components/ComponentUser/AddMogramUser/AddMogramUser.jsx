"use client";
import { React, useContext, useEffect, useState } from "react";
import styles from "../../../css/componantUser/AddShahed/AddShahed.module.css";
import { ContextUser } from "../../../../context/Context";
import Joi from "joi";

export default function AddMogramUser() {
  const { setOpenAuth, getSingleUser, checkConfition } =
    useContext(ContextUser);
  const [addData, setAddData] = useState({
    category: "mogramharb",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
  const [imageProfile, setImageProfile] = useState("");
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }
  console.log(imageProfile);
  function handlechange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);
  const [document, setDocument] = useState("");
  function handleChangeDocuments(e) {
    setDocument(e.target.files);
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
    } else if (!localStorage.getItem("token")) {
      setOpenAuth("login");
    } else {
      if (checkConfition === true) {
        setErrorListUser("");
        setSuccessAdd(false);
        if (!document) return alert("يرجي رفع الوثائق");

        const formData = new FormData();
        formData.append("name", addData.name);
        formData.append("selfImg", imageProfile);
        formData.append("externalLinks", addData.externalLinks);
        formData.append("governorate", addData.governorate);
        formData.append("category", addData.category);
        formData.append("content", addData.content);
        if (Array.isArray(document)) {
          document.forEach((file) => {
            formData.append("documents", file);
          });
        } else if (document instanceof FileList) {
          for (let i = 0; i < document.length; i++) {
            formData.append("documents", document[i]);
          }
        }
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
      } else {
        setOpenAuth("faild");
      }
    }
  }

  return (
    <div>
      <form action="" className={styles.form}>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(20px)", width: "90%" }}
            >
              {error[index].message}
            </p>
          ))}
        {errorBackUser &&
          errorBackUser?.error === "Cannot read property '0' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(0)", width: "90%" }}
            >
              يرجي رفع الصورة
            </p>
          )}
        {successAdd && setOpenAuth("successaddinform")}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor="">اسم المجرم</label>
              <input
                type="text"
                placeholder="اسم المجرم"
                className="form-control"
                name="name"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                placeholder="   المحافظة"
                className="form-control"
                name="governorate"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي</label>
              <input
                type="text"
                name="externalLinks"
                placeholder="رابط خارجي"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                صورة (اجباري)
              </p>
              <label htmlFor="file-upload" className={styles.customfileupload}>
                ارفع الصورة
              </label>
              <input
                type="file"
                name="selfImg"
                id="file-upload"
                onChange={handleChangeImageProfile}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                وثيقة او ملف (ملف pdf او word او فيديو mp4 او ملف zip)
              </p>
              <label htmlFor="file-upload1" className={styles.customfileupload}>
                أرفع الملفات
              </label>
              <input
                type="file"
                name="selfImg"
                id="file-upload1"
                onChange={handleChangeDocuments}
                multiple
              />
            </div>
          </div>
          <div className={styles.input1}>
            <label htmlFor="">شرح مفصل</label>
            <textarea
              name="content"
              id=""
              className="form-control"
              onChange={handlechange}
            ></textarea>
          </div>
        </div>
      </form>
      <div className={styles.btnbottom}>
        <button
          className={`p-[2px_25px] border-none rounded-[20px] cursor-pointer `}
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
            " اضافة بيانات"
          )}
        </button>
      </div>
    </div>
  );
}
