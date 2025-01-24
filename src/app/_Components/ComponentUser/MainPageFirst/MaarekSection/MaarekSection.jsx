"use client";
import React from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
export default function MaarekSection() {
  const router = useRouter();

  function getAllMaarek() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=maarek&limit=4"
    );
  }

  const { data } = useQuery("marek", getAllMaarek, {
    cacheTime: 1100000,
  });
  const splitNewsName = (name) => {
    if (name.length > 69) {
      return name.slice(0, 69) + "...";
    }
    return name;
  };
  return (
    <div>
      <div className="container">
        <div className="header position-relative py-[3rem]">
          <h3 className="header-text relative text-danger">معارك الثوار</h3>
        </div>
      </div>
      <div className="regime" style={{ marginBottom: "50px" }}>
        <div className="demonstrations py-3">
          <div className="container">
            <div className="row gy-3 mb-4">
              <div className="w-full">
                <div className="row gy-2">
                  {data?.data.map((e, i) => (
                    <div
                      className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                      key={i}
                    >
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt={e?.selfImg?.description || "battles"}
                              className="w-full rounded-[0.5rem] h-[195px]"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="text">
                            <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                              {e.name.length > 69
                                ? splitNewsName(e.name)
                                : e.name}
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
    </div>
  );
}
