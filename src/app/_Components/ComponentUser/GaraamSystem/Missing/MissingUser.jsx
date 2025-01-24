'use client'
import React from "react";

// import "../../../../css/componantUser/GaraamSystem/Missing/MissingUser.css";
import { useRouter } from "next/navigation";

import SliderGrammSystemTwo from "../SliderGrammSystemTwo";
import axios from "axios";
import { useQuery } from "react-query";

export default function MissingUser() {
  const router = useRouter();
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/childData/search?category=missing&responsibleAuthority=system&limit=8"
    );
  }
  const { data } = useQuery("missingSystem", getAllLastNews, {
    cacheTime: 1800000,
  });
  return (
    <>
      <section className="martyrs" id="fourthree">
        <div className="max-w-screen-xl mx-auto  py-2">
          <div className="px-4 md:px-0  py-12">
            <h3 className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[160px] after:top-1/2 after:transform after:translate-y-1/2">المفقودين</h3>
          </div>
          <div className="grid md:grid-cols-4 gy-3 mb-4 gap-5 px-4 md:px-0">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/imgData/${e.profileImage}`}
                    alt={e?.name}
                    className=" w-full rounded-md h-[195px] fimg"
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
      <SliderGrammSystemTwo />
    </>
  );
}
