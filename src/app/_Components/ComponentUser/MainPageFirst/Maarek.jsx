"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FiveMainPageFirst() {
  const router = useRouter();

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=maarek&limit=4"
    );
  }

  const { data } = useQuery("marek", getAllLastNews, {
    cacheTime: 1100000,
  });

  return (
    <div className="container mx-auto">
      <div className="py-5">
        <h3 className="header-text mb-4">معارك الثوار</h3>
      </div>
      <div className="py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data?.data.map((e, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow-md">
              <div className="mb-3">
                <img
                  src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                  alt="mozaharat"
                  className="rounded-lg object-cover w-full h-48"
                  // width={500}
                  // height={300}
                  fetchPriority="high"

                />
              </div>
              <div>
                <p className="mb-2 font-medium">{e?.name}</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => router.push(`/newsDetails/${e?._id}`)}
                >
                  المزيد
                </button>
                <small className="block text-gray-500 mt-2">
                  {e?.createdAt && e?.createdAt.slice(0, 10)}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
