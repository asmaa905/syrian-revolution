'use client'
import React from "react";
// import './MartyrsUser.css'

import SliderGraemSliderOne from "../SliderGraemSliderOne";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export default function MartyrsUser() {
  const router = useRouter();
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/childData/search?category=martyr&responsibleAuthority=system&limit=8"
    );
  }
  const { data } = useQuery("martyrSystem", getAllLastNews, {
    cacheTime: 1800000,
  });
  return (
    <>
      <section className="martyrs" id="fourtwo">
        <div className=" max-w-screen-xl mx-auto ">
          <div className=" px-4 md:px-0 py-12">
            <h3 className="relative text-[28px]  font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[160px] after:top-1/2 after:transform after:translate-y-1/2">الشهداء</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-5 gy-3 mb-4 pb-6 px-4 md:px-0">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/imgData/${e.profileImage}`}
                    alt={e?.name}
                    className=" w-full rounded-md h-[195px]"
                  />
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
                  <small className="datedSingle">
                    {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SliderGraemSliderOne />
    </>
  );
}
