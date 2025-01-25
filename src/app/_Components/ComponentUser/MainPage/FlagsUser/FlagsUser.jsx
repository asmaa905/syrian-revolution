"use client";

import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";

import style from "../../../../css/componantUser/MainPage/FlagsUser/FlagsUser.module.css";
import { useRouter } from "next/navigation";
export default function FlagsUser() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const currentUserId = localStorage.getItem("idUserLogin");
  const splitNewsName = (name) => {
    if (name.length > 69) {
      return name.slice(0, 69) + "...";
    }
    return name;
  };
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=lastNews&page=4&limit=9"
    );
  }
  const { data: data1, refetch } = useQuery("one", getAllLastNews);

  function getAllLastNews1(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=lastNews&page=${page}`
    );
  }
  getAllLastNews();

  const { data: data2 } = useQuery(
    ["twolastsnew", page],
    () => getAllLastNews1(page),
    {
      keepPreviousData: true,
      cacheTime: 1800000,
    }
  );
  ////////////////////////
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 4);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
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
      refetch();
      console.log("تم تحديث الرؤية بنجاح", res);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };
  return (
    <div>
      <div className="demonstrations py-3">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%]">
              <div className="row gy-2">
                {data1?.data
                  .filter(
                    (e) =>
                      e.category === "lastNews" && e.visibility === "العامة"
                  )
                  .map((e, i) => (
                    <div
                      className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%]"
                      key={i}
                    >
                      <div className="news">
                        <div className="">
                          <div>
                            {currentUserId === e.user._id ? (
                              <select
                                id="small-dropdown"
                                value={selectedOption[e._id] || e.visibility}
                                onChange={(event) => handleChange(event, e._id)}
                                style={{ padding: "5px", fontSize: "14px" }}
                                className="m-2 font-[400] text-[14px]"
                              >
                                <option value="" disabled>
                                  {e.visibility}
                                </option>

                                <>
                                  <option value="العامة">العامة</option>
                                  <option value="خاص بي">خاص بي</option>
                                </>
                              </select>
                            ) : (
                              <p className="m-2 font-[400] text-[14px]">
                                {e.visibility}
                              </p>
                            )}
                          </div>
                          {e.images[0] ? (
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e.images[0]?.imgPath}`}
                              alt={e.images[0]?.description || "image"}
                              className="w-full rounded-[0.5rem] h-[195px]"
                              fetchPriority="high"
                            />
                          ) : (
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e.selfImg}`}
                              alt={e.images[0]?.description || "image"}
                              className="w-full rounded-[0.5rem] h-[195px]"
                              fetchPriority="high"
                            />
                          )}
                          {e?.video && (
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
                                src={`https://syrianrevolution1.com/postImages/${e?.video}`}
                                type="video/mp4"
                              />
                              المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                            </video>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`${style.lastSlider} md:w-5/12  flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%]`}
            >
              <div className=" muted p-2">
                {data2?.data.map((e, i) => (
                  <div
                    key={i}
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={{ backgroundColor: "#ECECEC" }}
                  >
                    <div className="md:w-1/3 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%]">
                      {e.images.length > 0 && (
                        <img
                          src={`https://syrianrevolution1.com/postImages/${e.images[0]?.imgPath}`}
                          alt={e.images[0]?.description || "image"}
                          className="w-full rounded-[0.5rem] h-[195px] h-[50%_!important]"
                          fetchPriority="high"
                        />
                      )}
                      {e?.video && (
                        <video
                          width="320"
                          height="240px"
                          style={{
                            width: "100%",
                            marginBottom: "30px",
                            height: "200px",
                          }}
                          className="w-full rounded-[0.5rem] h-[195px] h-[50%_!important]"
                          controls
                        >
                          <source
                            src={`https://syrianrevolution1.com/postImages/${e?.video}`}
                            type="video/mp4"
                          />
                          المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                        </video>
                      )}
                    </div>
                    <div className="md:w-2/3 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%]">
                      <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                        {e?.name.length > 69 ? splitNewsName(e?.name) : e?.name}
                        <br />
                        <button
                          className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                          onClick={() => router.push(`/newsDetails/${e._id}`)}
                        >
                          المزيد
                        </button>
                        <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                          {e?.createdAt && e?.createdAt.slice(0, 10)}
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <button
                  onClick={handleNextPage}
                  className="btn btn-secondary rounded-3"
                >
                  +
                </button>
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="btn btn-secondary rounded-3 opacity-1 cursor-default"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
