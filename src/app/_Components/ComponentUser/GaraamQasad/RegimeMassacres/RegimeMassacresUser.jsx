'use client'
import React from "react";
import "../../../../css/componantUser/GaraamSystem/RegimeMassacres/RegimeMassacresUser.css";
// import { useNavigate } from "react-router-dom";

import SliderGraamQasad from "../SliderGraamQasad";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function RegimeMassacresUser() {
  const router = useRouter();
  function getMascersSystem1() {
    return axios.get(
      "http://localhost:4500/massacres/search?responsibleAuthority=qasad&limit=8"
    );
  }
  const { data } = useQuery("oneMascersQasads1", getMascersSystem1, {
    cacheTime: 1800000,
  });
console.log(data)
  return (
    <>
      <section
        className="regime"
        style={{ marginBottom: "100px" }}
        id="fiveone"
      >
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`http://localhost:4500/postImages/${e.profileImage}`}
                    alt={e?.title}
                    className=" w-full rounded-md h-[195px]"
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
      <SliderGraamQasad />
    </>
  );
}
