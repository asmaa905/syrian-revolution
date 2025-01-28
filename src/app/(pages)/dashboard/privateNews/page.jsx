"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PrivateNews() {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();

  function getLastNews() {
    return axios
      .get(
        `https://syrianrevolution1.com/users/single/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error);
      });
  }

  let { data, refetch } = useQuery("last", getLastNews);

  const handleChange = async (event, newsId) => {
    const newValue = event.target.value;
    try {
      await updateVisibility(newsId, newValue);
      setSelectedOption((prevOptions) => ({
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
            Authorization: `${token}`,
          },
        }
      );
      console.log("تم تحديث الرؤية بنجاح", res);
      refetch();
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };
  const publish = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://syrianrevolution1.com/lists/posts/${localStorage.getItem(
          "idUserLogin"
        )}/publish/${postId}`,
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      refetch();
    } catch (err) {
      console.error("Error occurred:", err);
      alert("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <>
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="header position-relative py-[3rem]">
            <h5 className="text-danger privite-news-header">منشوراتي الخاصة</h5>
          </div>
          <Swiper spaceBetween={30} slidesPerView={4} className="row gy-3 mb-4">
            {data?.lists
              ?.filter(
                (e) => e.category === "lastNews" && e.visibility === "خاص بي"
              )
              ?.map((last, i) => (
                <SwiperSlide
                  key={i}
                  className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                >
                  <div>
                    <select
                      id="small-dropdown"
                      value={selectedOption[last._id] || last.visibility}
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
                  </div>

                  {last.images.length > 0 && (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || "image"}
                      className="w-100 rounded-[0.5rem] h-[195px]"
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
                      className="w-100 rounded-[0.5rem] h-[195px]"
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
                    {last.name}
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
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="header position-relative py-[3rem]">
            <h5 className="text-danger privite-news-header">
              المنشورات المحفوظة{" "}
            </h5>
          </div>
          <Swiper spaceBetween={30} slidesPerView={4} className="row gy-3 mb-4">
            {data?.saveLists?.map((last, i) => (
              <SwiperSlide
                className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                key={i}
              >
                <div>
                  {last.images.length > 0 && (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || "image"}
                      className="w-full rounded-[0.5rem] h-[195px]"
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
                    {last.name}
                    <br />
                    <div>
                      <button
                        className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                        onClick={() => router.push(`/newsDetails/${last._id}`)}
                      >
                        المزيد
                      </button>
                      <button
                        className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                        onClick={() => publish(last._id)}
                      >
                        نشر
                      </button>
                    </div>

                    <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                      {last?.createdAt && last?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
