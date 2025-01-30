"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../css/componantDashboard/DataSite/UpdateChild.module.css";
import { useUser } from "../../context/Context";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function ResponseUpdateChild({ params }) {
  const [userUpdate, setUserUpdate] = useState({
    fatherName: "",
    motherName: "",
    nickname: "",
    dateOfBirth: "",
    governorate: "",
    name: "",
    place: "",
    externalLinks: "",
    responsibleAuthority: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getChildUser } = useUser();
  const [success, setSuccess] = useState(false);
  const { id } = React.use(params);
  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const [imageProfile, setImageProfile] = useState("");
  function handleImg(e) {
    setImageProfile(e.target.files[0]);
  }
  useEffect(() => {
    async function getSingleUser() {
      await axios
        .get(`https://syrianrevolution1.com/childData/${id}`)
        .then((result) => {
          setUserUpdate({
            fatherName: result.data.childData.fatherName || "",
            motherName: result.data.childData.motherName || "",
            nickname: result.data.childData.nickname || "",
            dateOfBirth: result.data.childData.dateOfBirth || "",
            governorate: result.data.childData.governorate || "",
            name: result.data.childData.name || "",
            place: result.data.childData.place || "",
            externalLinks: result.data.childData.externalLinks || "",
            responsibleAuthority:
              result.data.childData.responsibleAuthority || "",
            details: result.data.childData.details || "",
            profileImage: result.data.childData.profileImage || "",
          });
        })
        .catch((error) => console.log(error));
    }
    getSingleUser();
  }, [id]);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (
      userUpdate.fatherName !== "" &&
      userUpdate.fatherName !== undefined &&
      userUpdate.fatherName !== null
    ) {
      formData.append("fatherName", userUpdate.fatherName);
    }
    if (
      userUpdate.motherName !== "" &&
      userUpdate.motherName !== undefined &&
      userUpdate.motherName !== null
    ) {
      formData.append("motherName", userUpdate.motherName);
    }
    if (
      userUpdate.governorate !== "" &&
      userUpdate.governorate !== undefined &&
      userUpdate.governorate !== null
    ) {
      formData.append("governorate", userUpdate.governorate);
    }
    if (
      userUpdate.dateOfBirth !== "" &&
      userUpdate.dateOfBirth !== undefined &&
      userUpdate.dateOfBirth !== null
    ) {
      formData.append("dateOfBirth", userUpdate.dateOfBirth);
    }
    if (
      userUpdate.nickname !== "" &&
      userUpdate.nickname !== undefined &&
      userUpdate.nickname !== null
    ) {
      formData.append("nickname", userUpdate.nickname);
    }
    if (
      imageProfile !== null &&
      imageProfile !== undefined &&
      imageProfile !== ""
    ) {
      formData.append("profileImage", imageProfile);
    }
    if (
      userUpdate.name !== "" &&
      userUpdate.name !== undefined &&
      userUpdate.name !== null
    ) {
      formData.append("name", userUpdate.name);
    }
    if (
      userUpdate.place !== "" &&
      userUpdate.place !== undefined &&
      userUpdate.place !== null
    ) {
      formData.append("place", userUpdate.place);
    }
    if (
      userUpdate.externalLinks !== "" &&
      userUpdate.externalLinks !== undefined &&
      userUpdate.externalLinks !== null
    ) {
      formData.append("externalLinks", userUpdate.externalLinks);
    }
    if (
      userUpdate.details !== "" &&
      userUpdate.details !== undefined &&
      userUpdate.details !== null
    ) {
      formData.append("details", userUpdate.details);
    }
    if (
      userUpdate.responsibleAuthority !== "" &&
      userUpdate.responsibleAuthority !== undefined &&
      userUpdate.responsibleAuthority !== null
    ) {
      formData.append("responsibleAuthority", userUpdate.responsibleAuthority);
    }
    try {
      setLoading(true);
      setSuccess(false);
      const response = await fetch(
        `https://syrianrevolution1.com/childData/update/${id}/${localStorage.getItem(
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
      if (result?.data?._id) {
        setSuccess(true);
        getChildUser();
      } else if (result === "Date of birth cannot be in the future") {
        alert("التاريخ غير صالح");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className={`headDashboard`}>
        <p> تعديل بيانات </p>
      </div>
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          {success && (
            <p
              className="alert alert-success alerthemself"
              style={{ width: "100%", transform: "translatey(10px)" }}
            >
              تم التحديث بنجاح
            </p>
          )}
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم</label>
              <input
                type="text"
                placeholder="  الاسم "
                className="form-control"
                name="name"
                value={userUpdate.name}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> مكان الحدث</label>
              <input
                name="place"
                type="text"
                placeholder="  مكان الحدث "
                value={userUpdate.place}
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الاب</label>
              <input
                type="text"
                placeholder="  اسم الاب"
                className="form-control"
                name="fatherName"
                value={userUpdate.fatherName}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الام</label>
              <input
                name="motherName"
                type="text"
                placeholder=" اسم الام "
                value={userUpdate.motherName}
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الكنية </label>
              <input
                name="nickname"
                type="text"
                placeholder=" الكنية"
                className="form-control"
                onChange={handlechange}
                value={userUpdate.nickname}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> المواليد</label>
              <input
                name="dateOfBirth"
                type="date"
                placeholder="  المواليد"
                className="form-control"
                onChange={handlechange}
                value={
                  userUpdate.dateOfBirth && userUpdate?.dateOfBirth.slice(0, 10)
                }
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي</label>
              <input
                type="text"
                placeholder="  رابط خارجي "
                className="form-control"
                name="externalLinks"
                value={userUpdate.externalLinks}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الجهة المسؤولة</label>
              <select
                name="responsibleAuthority"
                onChange={handlechange}
                className="form-control"
                value={userUpdate.responsibleAuthority}
              >
                <option value="system">النظام</option>
                <option value="daaeh">داعش</option>
                <option value="qasad">قسد</option>
              </select>
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <div>
                <p style={{ fontSize: "13px", marginBottom: "15px" }}>صورة</p>
                <label htmlFor="q2" className="customfileupload">
                  {" "}
                  ارفع الملف هنا
                </label>
                <input
                  type="file"
                  id="q2"
                  name="profileImage"
                  onChange={handleImg}
                />
              </div>
            </div>
            <div className={styles.inp1}>
              <label htmlFor="">المحافظة</label>
              <input
                type="text"
                name="governorate"
                className="form-control"
                placeholder="المحافظة"
                onChange={handlechange}
                value={userUpdate.governorate}
              />
            </div>
          </div>
          <div className={styles.input1}>
            <label htmlFor="">شرح مفصل</label>
            <textarea
              name="details"
              style={{ height: "200px" }}
              id=""
              onChange={handlechange}
              className="form-control"
              value={userUpdate.details}
            ></textarea>
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
          onClick={() => router.push(-1)}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
