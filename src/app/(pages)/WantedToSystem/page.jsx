"use client";

import React, { useState } from "react";
//WantedToSystem.module.css
// import style from "../../../css/componantUser/WantedToSystem/WantedToSystem.module.css";

import axios from "axios";
import Joi from "joi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

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
          <Head>
  <title>الثورة السورية |المطلوبين للنظام 
 

  </title>

  <meta
  name="description"
  content="منصة لتوثيق المطلوبين للنظام، تشمل معلومات حول الاسم، الكنية، واسم الأب. قم بإضافة بياناتك للبحث عن المفقودين والمعتقلين في سياق الثورة السورية."
/>
<meta
  name="keywords"
  content="المطلوبين للنظام, الاسم, الكنية, اسم الأب, الثورة السورية, توثيق المطلوبين, مفقودين, معتقلين, حقوق الإنسان, العدالة"
/>

  </Head>
  <h1 className="hidden"></h1>
      <div >
        <div style={{ width: "100%", marginTop: "10px" }}>
          {errorListUser &&
            errorListUser.map((error, index) => (
              <p key={index} className="bg-gray-200 text-gray-800  rounded border border-gray-300 text-[14px] mx-auto p-[5px] translate-y-[30px] w-4/5">
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
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"   style={{ margin: "0 10px" }}/>

            ادخل البيانات هنا
          </span>
          <div className="flex md:flex-row flex-col gap-5 items-center w-4/5 translate-y-10 mx-auto">
            <div>
            <label htmlFor="name-input" className="text-[10px] text-[#212529]">الاسم</label>
<input
  type="text"
  id="name-input"
  name="name"
  className="form-control text-[16px] placeholder:text-[10px]"
  placeholder="الاسم"
  aria-label="الاسم"
  onChange={handlechange}
/>

            </div>
            <div>
            <label htmlFor="nickname-input" className="text-[10px] text-[#212529]">الكنية</label>
<input
  type="text"
  id="nickname-input"
  name="nickname"
  className="form-control text-[16px] placeholder:text-[10px]"
  placeholder="أدخل الكنية"
  aria-label="الكنية"
  onChange={handlechange}
/>
            </div>
            <div>
            <label htmlFor="father-name-input" className="text-[10px] text-[#212529]">اسم الأب</label>
<input
  type="text"
  id="father-name-input"
  name="fatherName"
  className="form-control text-[16px] placeholder:text-[10px]"
  placeholder=" اسم الأب"
  aria-label="اسم الأب"
  onChange={handlechange}
/>

            </div>

            <button
              className="btn btn-primary"
              style={{ transform: "translateY(10px)" }}
              onClick={handleSearch}
            >
              {loading ? (
                <div role="status">
                              <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                                className="h-5 w-5 text-secondary"
                              />
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
          <div  style={{ marginTop: "45px" }}>
            <div className='overflow-auto h-[350px] wantedscroll '>
              <div >
                <table className='min-w-[1500px]'>
                  <thead className="bg-[#D7D4D4]">
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
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#E8E7E7' }}>
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

      
    </>
  );
}
