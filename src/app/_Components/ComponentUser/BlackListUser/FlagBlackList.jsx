"use client";

import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

export default function FlagBlackList() {
  const router = useRouter();

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=Traitors&limit=4"
    );
  }
  getAllLastNews();
  const { data: data1 } = useQuery("Traitors", getAllLastNews, {
    cacheTime: 1800000,
  });
  //////////////////////////////////////
  function getAllLastNews1() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=Traitors&page=2&limit=10"
    );
  }
  getAllLastNews();
  const { data: data2 } = useQuery("Traitors2", getAllLastNews1, {
    cacheTime: 1800000,
  });

  return (
    <div id="threetwo">
      <div className="demonstrations py-3 " style={{ marginBottom: "100px" }}>
        <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%]">
              <div className="row gy-2">
                {data1?.data.map((e, i) => (
                  <div
                    className="md:w-1/2 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%]"
                    key={i}
                  >
                    <div className="news">
                      <div className="item">
                        <div className="image">
                          <img
                            src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                            alt="lastNews"
                            className=" w-full rounded-3 h-[195px]"
                          />
                        </div>
                        <div className="text">
                          <p
                            className="font-[400] text-[25px] leading-[38px] text-[#212529]"
                            style={{ margin: "10px 0" }}
                          >
                            {e?.name}
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
            <div className="lastSlider md:w-5/12 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%]">
              <div className=" muted p-2 overflow-hidden">
                {data2?.data.map((e, i) => (
                  <div
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={{ backgroundColor: "#ECECEC" }}
                    key={i}
                  >
                    <div className="md:w-1/3 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%]">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                        alt="lastNews"
                        className="w-full"
                      />
                    </div>
                    <div className="md:w-2/3 flex-[0_0_auto]   px-[0.75rem] mt-[1rem] max-w-[100%] h-[100%]">
                      <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                        {e?.name}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
