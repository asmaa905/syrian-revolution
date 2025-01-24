"use client";

import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function SystemSection() {
  const router = useRouter();
  const splitNewsName = (name) => {
    if (name.length > 69) {
      return name.slice(0, 69) + "...";
    }
    return name;
  };

  function getMascers() {
    return axios.get(
      "https://syrianrevolution1.com/massacres/search?responsibleAuthority=system&limit=4"
    );
  }
  const { data } = useQuery("mascers", getMascers, {
    cacheTime: 900000,
  });

  return (
    <div>
      <div className="container">
        <div className="header position-relative py-[3rem]">
          <h3 className="header-text relative text-danger"> الملفات </h3>
        </div>
      </div>
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data.map((e, i) => (
              <div
                className="lg:w-[25%] md:w-[33.33%] flex-[0_0_auto] w-full sm:w-[50%] px-[0.75rem] mt-[1rem] max-w-[100%]"
                key={i}
              >
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${e.profileImage}`}
                    alt={"post"}
                    className="w-full rounded-[0.5rem] h-[195px]"
                    fetchPriority="high"
                  />
                </div>
                <p className="font-[400] text-[25px] leading-[38px] text-[#212529]">
                  {e?.title?.length > 69 ? splitNewsName(e?.title) : e?.title}
                  <br />
                  <br />
                  <button
                      className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
                      onClick={() => router.push(`/NewsDetailsMascers/${e._id}`)}
                  >
                    المزيد
                  </button>
                  <small className="datedSingle text-[12px] leading-[18px] font-[400] text-[#808080]">
                  {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
