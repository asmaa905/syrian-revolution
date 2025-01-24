'use client'
import React from "react";
import "../../../../css/componantUser/GaraamSystem/RegimeMassacres/RegimeMassacresUser.css";


import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import SliderGaraemSystem from "../SliderGaraemSystem";

export default function RegimeMassacresUser() {
  const router = useRouter();
  function getMascersSystem1() {
    return axios.get(
      "https://syrianrevolution1.com/massacres/search?responsibleAuthority=system&limit=8"
    );
  }
  const { data } = useQuery("oneMascersSystem1", getMascersSystem1);

  return (
    <>
      <section
        className="regime"
        style={{ marginBottom: "100px" }}
        id="fourone"
      >
        <div className="max-w-screen-xl mx-auto  py-2">
          <div className="grid md:grid-cols-4 gy-3 mb-4 gap-5 px-4 md:px-0">
            {data?.data.map((e, i) => (
              <div className="px-4 md:px-0 rounded-md " key={i}>
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${e.profileImage}`}
                    alt={e?.title}
                    className=" w-full h-[195px] rounded-lg fimg "
                    fetchPriority="high"
                  />
                </div>
                <p>
                  {e?.title ? e?.title : ""}
                  <br />
                  <button
              className="bg-[#ffbaba] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"
                    onClick={() => router.push(`/NewsDetailsMascers/${e._id}`)}
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
      <div>

      <SliderGaraemSystem />
      </div>
    </>
  );
}
