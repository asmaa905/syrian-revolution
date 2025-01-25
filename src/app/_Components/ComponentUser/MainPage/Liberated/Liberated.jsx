"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export default function Liberated() {
  const currentUserId = localStorage.getItem("idUserLogin");
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const { data, refetch } = useQuery("lasts", getAllLastNews);

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
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=lastNews&page=3&limit=5"
    );
  }
  console.log(data);

  return (
    <div>
      <div className="demonstrations py-3">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
          <div className="row mt-[-1rem] mb-[3rem]">
            <div className="md:w-1/2 flex-[0_0_auto] h-[100%] px-[0.75rem]">
              <div className="right h-[100%]">
                <div className=" ">
                  <div>
                    {currentUserId === data?.data[0].user._id ? (
                      <select
                        id="small-dropdown"
                        value={
                          selectedOption[data?.data[0]._id] ||
                          data?.data[0].visibility
                        }
                        onChange={(event) =>
                          handleChange(event, data?.data[0]._id)
                        }
                        style={{ padding: "5px" }}
                        className="m-2 font-[400] text-[14px]"
                      >
                        <option value="" disabled>
                          {data?.data[0].visibility}
                        </option>
                        <option value="العامة">العامة</option>
                        <option value="خاص بي">خاص بي</option>
                      </select>
                    ) : (
                      <p className="m-2 font-[400] text-[14px]">
                        {data?.data[0].visibility}
                      </p>
                    )}
                  </div>
                  {data?.data[0]?.selfImg ? (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.selfImg}`}
                      alt="home"
                      className=" w-full rounded-[0.5rem] h-[75%]"
                      fetchPriority="high"
                    />
                  ) : (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.images[0].imgPath}`}
                      alt="home"
                      className=" w-full rounded-[0.5rem] h-[75%]"
                      fetchpriority="high"
                    />
                  )}
                  {data?.data[0]?.video && (
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
                        src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.video}`}
                        type="video/mp4"
                      />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  )}
                </div>
                <div className="info">
                  <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                    {data?.data[0].name.length > 69
                      ? splitNewsName(data?.data[0].name)
                      : data?.data[0].name}
                    <br />
                    <button
                      className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                      onClick={() =>
                        router.push(`/newsDetails/${data?.data[0]._id}`)
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                      {data?.data.length > 0 &&
                        data?.data[0]?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex-[0_0_auto] px-[0.75rem] mt-[1rem] max-w-[100%]">
              <div className="row gy-2">
                {data?.data
                  .filter(
                    (e) =>
                      e.category === "lastNews" && e.visibility === "العامة"
                  )
                  .slice(1, 5)
                  .map((e, i) => (
                    <div className="md:w-1/2 flex-[0_0_auto] px-[0.75rem] mt-[1rem] max-w-[100%]" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className=" ">
                            <div>
                              {currentUserId === e.user._id ? (
                                <select
                                  id="small-dropdown"
                                  value={selectedOption[e._id] || e.visibility}
                                  onChange={(event) =>
                                    handleChange(event, e._id)
                                  }
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
                                fetchpriority="high"
                              />
                            ) : (
                              <img
                                src={`https://syrianrevolution1.com/postImages/${e.selfImg}`}
                                alt={e.images[0]?.description || "image"}
                                className="w-full rounded-[0.5rem] h-[195px]"
                                fetchpriority="high"
                              />
                            )}

                            {e.video && (
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
                          <div className="text">
                            <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                              {e?.name.length > 69
                                ? splitNewsName(e?.name)
                                : e?.name}
                              <br />
                              <button
                                className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                                onClick={() =>
                                  router.push(`/newsDetails/${e._id}`)
                                }
                              >
                                المزيد
                              </button>
                              <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                                {e?.createdAt && e?.createdAt.slice(0, 10)}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
