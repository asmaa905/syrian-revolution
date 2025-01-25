'use client'
import React from "react";
// import "../../../../css/componantUser/GaraamSystem/Missing/MissingUser.css";
import SliderDaaehTwo from "../SliderDaaehTwo";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function MissingUser() {
  const router = useRouter();
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/childData/search?category=missing&responsibleAuthority=daaeh&limit=8"
    );
  }
  const { data } = useQuery("missing1Daaeh", getAllLastNews, {
    cacheTime: 1800000,
  });
  return (
    <>
      <section className="martyrs" id="seventhree">
        <div className="max-w-screen-xl mx-auto  py-2">
          <div className=" position-relative py-5">
            <h3  className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[160px] after:top-1/2 after:transform after:translate-y-1/2">المفقودين</h3>
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
                    className="btu d-inline-block mx-1 px-3 rounded-3"
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
      <SliderDaaehTwo />
    </>
  );
}
