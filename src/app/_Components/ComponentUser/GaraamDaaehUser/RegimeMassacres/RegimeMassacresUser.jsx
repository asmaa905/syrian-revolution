'use client'
import React from "react";
//RegimeMassacresUser.css
import "../../../../css/componantUser/GaraamSystem/RegimeMassacres/RegimeMassacresUser.css";
import { useRouter } from "next/navigation";
import SliderGaraemDaaehUser from "../SliderGaraamDaaehUser";
import { useQuery } from "react-query";
import axios from "axios";
export default function RegimeMassacresUser() {
  const router = useRouter();
  function getMascersSystem1() {
    return axios.get(
      "http://localhost:4500/massacres/search?responsibleAuthority=daaeh&limit=8"
    );
  }
  const { data } = useQuery("oneMascersDaaeh1", getMascersSystem1);

  return (
    <>
      <section
        className="regime"
        style={{ marginBottom: "100px" }}
        id="sevenone"
      >
        <div className="max-w-screen-xl mx-auto  py-2">
          <div className="grid md:grid-cols-4 gy-3 mb-4 gap-5 px-4 md:px-0">
            {data?.data.map((e, i) => (
              <div className="px-4 md:px-0 rounded-md " key={i}>
                <div className="image mb-2">
                  <img
                    src={`http://localhost:4500/postImages/${e.profileImage}`}
                    alt={e?.title}
                    className=" w-full rounded-md h-[195px] fimg"
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
      <SliderGaraemDaaehUser />
    </>
  );
}
