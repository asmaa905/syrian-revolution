"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export default function Liberated() {
  const router = useRouter();

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=symbols&limit=5"
    );
  }
  const { data } = useQuery("symbol", getAllLastNews, {
    cacheTime: 1800000,
  });
  return (
    <div id="twoone">
      <div className="demonstrations  py-[3rem]">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
          <div className="row gy-3 mb-5">
            <div className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%] w-full">
              <div className="right h-[100%]">
                <div className="image mb-4">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.selfImg}`}
                    alt="symbolThowra"
                    className=" w-full rounded-[0.5rem] md:h-[450px]"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                    {data?.data[0]?.name}
                    <br />
                    <button
                      className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                      onClick={() =>
                        router.push(`/newsDetails/${data?.data[0]?._id}`)
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
            <div className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%] w-full">
              <div className="row gy-2">
                {data?.data.length > 0 &&
                  data?.data.slice(1, 5).map((e, i) => (
                    <div
                      className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%] w-full"
                      key={i}
                    >
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="symbolThowra"
                              className=" w-full rounded-[0.5rem] h-[195px]"
                            />
                          </div>
                          <div className="text">
                            <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                              {e?.name}
                              <br />
                              <button
                                className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                                onClick={() =>
                                  router.push(`/newsDetails/${e?._id}`)
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
