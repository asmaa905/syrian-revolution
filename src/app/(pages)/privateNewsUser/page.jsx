"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../_Components/ComponentUser/Header/Header";
export default function PrivateNewsUser() {
  const [selectedOption, setSelectedOption] = useState({});
  const [data, setData] = useState({});

  const router = useRouter();

  async function getSingleUserUpdate() {
    try {
      const result = await axios.get(
        `https://syrianrevolution1.com/users/single/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    getSingleUserUpdate();
  }, []);

  const handleChange = async (event, newsId) => {
    const newValue = event.target.value;
    try {
      await updateVisibility(newsId, newValue);
      setSelectedOption((prevOptions) => ({
        ...prevOptions,
        [newsId]: newValue,
      }));
    } catch (error) {
      console.error("Error updating visibility", error);
    }
  };

  getSingleUserUpdate();
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

      console.log("Visibility updated successfully", res);
    } catch (error) {
      console.error("Error updating visibility", error);
    }
  };

  return (
    <>
      <Header />
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="header position-relative py-[3rem]">
            <h5 className="text-danger privite-news-header">منشوراتي الخاصة</h5>
          </div>
          <div className="row gy-3 mb-4">
            {data?.lists
              ?.filter((e) => e.visibility === "خاص بي")
              .slice(0, 4)
              .map((last, i) => (
                <div
                  className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                  key={i}
                >
                  {console.log(data.lists)}

                  <div>
                    <select
                      id="small-dropdown"
                      value={selectedOption[last._id] || last.visibility}
                      onChange={(event) => handleChange(event, last._id)}
                      style={{ padding: "5px", fontSize: "14px" }}
                      className="m-2 font-[400] text-[14px]"
                    >
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
                      Your browser does not support the video tag.
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
                      {last?.createdAt?.slice(0, 10)}
                    </small>
                  </p>
                </div>
              ))}
          </div>
          <div className="header position-relative py-[3rem]">
            <h5 className="text-danger privite-news-header">منشوراتي العامة</h5>
          </div>
          <div className="row gy-3 mb-4">
            {data?.lists
              ?.filter((e) => e.visibility === "العامة")
              .slice(0, 4)
              .map((last, i) => (
                <div
                  className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                  key={i}
                >
                  {console.log(data.lists)}

                  <div>
                    <select
                      id="small-dropdown"
                      value={selectedOption[last._id] || last.visibility}
                      onChange={(event) => handleChange(event, last._id)}
                      style={{ padding: "5px", fontSize: "14px" }}
                      className="m-2 font-[400] text-[14px]"
                    >
                      <option value="العامة">العامة</option>
                      <option value="خاص بي">خاص بي</option>
                    </select>
                  </div>

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
                      Your browser does not support the video tag.
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
                      {last?.createdAt?.slice(0, 10)}
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
