'use client'
import React, { useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Head from "next/head";

export default function SearchList() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  function searchList() {
    return axios.get(
      `https://syrianrevolution1.com/childData/searchName?name=${name}`
    );
  }
  const { data, refetch } = useQuery("searchchild", searchList, {
    enabled: false,
    onSettled: () => {
      setIsLoading(false);
    },
  });

  function handlesearch() {
    if (name !== "") {
      setIsLoading(true);
      refetch();
    }
  }

  return (
    <>
    <Head>
  <title>الثورة السورية |الشهداء و المعتقلين و المفقودين 
 

  </title>

  <meta
  name="description"
  content="منصة لتوثيق الشهداء والمعتقلين والمفقودين في الثورة السورية. تعرف على قصص الشهداء، احصل على معلومات حول المعتقلين، وشارك في البحث عن المفقودين."
/>


<meta
  name="keywords"
  content="الشهداء, المعتقلين, المفقودين, الثورة السورية, توثيق, حقوق الإنسان, العدالة, البحث عن المفقودين, قصص الشهداء, توثيق المعتقلين"
/>


  </Head>
<h1 className="hidden"></h1>
      <div >
        <div style={{ width: "100%", marginTop: "10px" }}>
          <span
            style={{
              backgroundColor: "#C1D6F2",
              padding: "5px 20px",
              borderRadius: "25px",
              transform: "translate(-10px,30px)",
              display: "inline-block",
            }}
          >
            <FontAwesomeIcon
              style={{ margin: "0 10px" }}
              icon={faMagnifyingGlass}
            />{" "}
            ادخل البيانات هنا
          </span>
          <div className="flex translate-y-[40px] items-center w-[80%] gap-5 mx-auto" >
            <div className="flex flex-col ">
              <label htmlFor="name-input" className="text-[10px] text-[#212529]">الاسم</label>
              <input
                   id="name-input"
                type="text"
                name="name"
                className="border px-3 py-[6px] rounded-md text-[16px] placeholder:text-[10px] text-[#212529]"
                placeholder="الاسم"
         
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              className="bg-[#0b5ed7] hover:bg-[#0b5ed7] text-white  px-3 py-[6px] rounded-md"
              style={{ transform: "translateY(10px)" }}
              onClick={handlesearch}
            >
              {isLoading ? (
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
              marginBottom: "30px",
            }}
          >
            <FontAwesomeIcon
              style={{ margin: "0 10px" }}
              icon={faMagnifyingGlass}
            />
            نتائج البحث
          </span>
          <div className="max-w-screen-xl mx-auto  py-2">
            <div  style={{ marginTop: "45px" }}>
              <div className="grid md:grid-cols-4 gy-3 mb-4 gap-5">
                {data?.data.map((e, i) => (
                  <div className="px-8 md:px-0" key={i}>
                    <div className="image mb-2">
                      {e?.profileImage&&   <img
                      src={`https://syrianrevolution1.com/imgData/${e?.profileImage}`}
                        alt={e?.name}
                        className=" w-full rounded-md h-[195px] "
                      />}
                   
                    </div>
                    <p>
                      {e?.name ? e?.name : ""}
                      <br />
                      <button
                        className="bg-[#ffbaba] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"
                        onClick={() => router.push(`/NewsDetailsMartyr/${e._id}`)}
                      >
                        المزيد
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
