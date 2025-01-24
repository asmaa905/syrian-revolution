"use client"; // Ensures this is a client-side component

import React, { useState } from "react";
import "../../../../css/componantUser/MainPage/RegimeMassacres/RegimeMassacresUser.css";
import { useRouter } from "next/navigation";
import styles from "./lastNews.module.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function lastNewsSection() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const router = useRouter();
  const currentUserId = localStorage.getItem("idUserLogin");
  const splitNewsName = (name) => {
    if (name.length > 69) {
      return name.slice(0, 69) + "...";
    }
    return name;
  };

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=lastNews&limit=12"
    );
  }

  let { data, refetch } = useQuery("lastNews", getAllLastNews);

  const handleChange = async (event, newsId) => {
    const newValue = event.target.value;

    try {
      await updateVisibility(newsId, newValue);

      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [newsId]: newValue,
      }));
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };

  const updateVisibility = async (newsId, newValue) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://syrianrevolution1.com/lists/updateVisibility/${newsId}`,
        { visibility: newValue },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      refetch();
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className={`${styles.header} position-relative py-[3rem]`}>
          <h3 className="header-text relative text-danger"> آخر الأخبار </h3>
        </div>
      </div>
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data
              .filter(
                (e) => e.category === "lastNews" && e.visibility === "العامة"
              )
              .map((last, i) => (
                <div
                  className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                  key={i}
                >
                  <div>
                    {currentUserId === last.user._id ? (
                      <select
                        id="small-dropdown"
                        value={selectedOptions[last._id] || last.visibility}
                        onChange={(event) => handleChange(event, last._id)}
                        style={{ padding: "5px", fontSize: "14px" }}
                        className="m-2 font-[400] text-[14px]"
                      >
                        <option value="" disabled>
                          {last.visibility}
                        </option>

                        <option value="العامة">العامة</option>
                        <option value="خاص بي">خاص بي</option>
                      </select>
                    ) : (
                      <p className="m-2 font-[400] text-[14px]">
                        {last.visibility}
                      </p>
                    )}
                  </div>
                  {last.images.length > 0 && (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || "image"}
                      className="w-full rounded-[0.5rem] h-[195px]"
                      fetchPriority="high"
                    />
                  )}
                  {last.video && (
                    <video
                      width="320"
                      height="240px"
                      style={{
                        width: "100%",
                        marginBottom: "30px",
                        height: "200px",
                      }}
                      className="w-full rounded-[0.5rem] h-[195px]"
                      controls
                    >
                      <source
                        src={`https://syrianrevolution1.com/postImages/${last?.video}`}
                        type="video/mp4"
                      />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  )}

                  <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                    {last.name.length > 69
                      ? splitNewsName(last.name)
                      : last.name}
                    <br />
                    <button
                      className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                      onClick={() => router.push(`/newsDetails/${last._id}`)}
                    >
                      المزيد
                    </button>
                    <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                      {last?.createdAt && last?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
