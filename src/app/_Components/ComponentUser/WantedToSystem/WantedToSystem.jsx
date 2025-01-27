"use client";

import React, { useState } from "react";
//WantedToSystem.module.css
import style from "../../../css/componantUser/WantedToSystem/WantedToSystem.module.css";
import MainNav from "../MainNav/MainNav";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Joi from "joi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WantedToSystem() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [searched, SetSearched] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorListUser, setErrorListUser] = useState(null);
  function handlechange(e) {
    SetSearched((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validationSearch() {
    let schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "الاسم  مطلوب",
        "any.required": "الاسم  مطلوب",
      }),
      fatherName: Joi.string().required().messages({
        "string.empty": "  اسم الاب مطلوب",
        "any.required": "  اسم الاب مطلوب",
      }),
      nickname: Joi.string().required().messages({
        "string.empty": "    الكنية مطلوبة",
        "any.required": "    الكنية مطلوبة",
      }),
    });
    return schema.validate(searched, { abortEarly: false });
  }

  async function handleSearch() {
    setMessage(false);
    let SearchExcel = validationSearch();
    if (SearchExcel.error) {
      setErrorListUser([SearchExcel.error.details]);
    } else {
      setErrorListUser("");
      setLoading(true);
      const url = `https://syrianrevolution1.com/sheet/search?name=${searched.name}&nickname=${searched.nickname}&fatherName=${searched.fatherName}`;
      await axios
        .get(url)
        .then((result) => {
          if (result.data.length) {
            setData(result.data);
            setLoading(false);
          } else {
            setMessage(true);
            setLoading(false);
            setData([]);
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <>
      <MainNav />
      <Navbar />
      <div className={style.MartyrsDash}>
        <div style={{ width: "100%", marginTop: "10px" }}>
          {errorListUser &&
            errorListUser.map((error, index) => (
              <p key={index} className="alert alert-secondary alerthemself">
                {error[index].message}
              </p>
            ))}
          <span
            style={{
              backgroundColor: "#C1D6F2",
              padding: "5px 20px",
              borderRadius: "25px",
              transform: "translate(-10px,30px)",
              display: "inline-block",
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"   style={{ margin: "0 10px" }}/>{" "}

            ادخل البيانات هنا
          </span>
          <div className={style.inputSearch}>
            <div>
              <label htmlFor="">الاسم</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="الاسم"
                onChange={handlechange}
              />
            </div>
            <div>
              <label htmlFor="">الكنية</label>
              <input
                type="text"
                name="nickname"
                className="form-control"
                placeholder="الكنية"
                onChange={handlechange}
              />
            </div>
            <div>
              <label htmlFor="">اسم الاب</label>
              <input
                type="text"
                name="fatherName"
                className="form-control"
                placeholder="اسم الاب"
                onChange={handlechange}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ transform: "translateY(10px)" }}
              onClick={handleSearch}
            >
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
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
                " بحث"
              )}
            </button>
          </div>

          <span
            style={{
              backgroundColor: "#C1D6F2",
              padding: "5px 20px",
              borderRadius: "25px",
              transform: "translate(-10px,55px)",
              display: "inline-block",
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"   style={{ margin: "0 10px" }}/>
            نتائج البحث
          </span>
          <div className={style.SuperVisor} style={{ marginTop: "45px" }}>
            <div className={style.allUser}>
              <div className={style.containerTable}>
                <table className={style.table}>
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th> الكنية</th>
                      <th>اسم الاب</th>
                      <th> اسم الام</th>
                      <th>المواليد</th>
                      <th> المكان</th>
                      <th> المحافظة</th>
                      <th> الجنسية</th>

                      <th> الجرم</th>

                      <th> الجهة المسؤلة</th>

                      <th> الملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i}>
                        <td>{e?.name}</td>
                        <td>{e?.nickname}</td>
                        <td>{e?.fatherName}</td>
                        <td>{e?.motherName}</td>
                        <td>{e?.year}</td>
                        <td>{e?.place}</td>
                        <td>{e?.governorate}</td>
                        <td></td>

                        <td>{e?.grom}</td>

                        <td>{e?.responsibleAuthority}</td>

                        <td>{e?.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {message && (
                  <p
                    style={{
                      textAlign: "center",
                      transform: "translatey(50px)",
                    }}
                  >
                    لا توجد بيانات متطابقة
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
