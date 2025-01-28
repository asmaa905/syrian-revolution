"use client";

import React, { useState } from "react";
// import style from "../../js/styleDashboard/MartyrsDash.module.css";

// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

export default function MartyrsDash() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  function getMartyr(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/childData/searchFalse?category=martyr&page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }

  ///////////////////////
  const { data, isLoading } = useQuery(
    ["martyrDashboardUser", page],
    () => getMartyr(page),
    {
      keepPreviousData: true,
    }
  );

  ////////////////////////////
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  ////////////////////////////////
  if (isLoading)
    return (
      <div
        className="spinner-border"
        role="status"
        style={{ position: "absolute", left: "50%", top: "50%" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <>
      <div className="martyrs" >
        <div className='bg-[#0d3a5a] text-white text-[14px] h-[45px] p-[10px] pr-[20px] pb-[15px] translate-y-[20px]'>
          <p>البيانات المستلمة / شهداء</p>
        </div>
        <div className="max-h-[350px] overflow-y-auto">
          <table>
            <thead>
              <tr>
                <th>اسم الشهيد</th>
                <th>اسم الناشر</th>

                <th> البيانات المرفوعة</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user, index) =>
                user.category === "martyr" && user.isAccepted === false ? (
                  <tr key={index}>
                    <td>{user.name} </td>
                    <td>{user?.user?.username} </td>

                    <td>
                      <button
                        className={`addrevloution`}
                        style={{ backgroundColor: "#3B9058", color: "white" }}
                        onClick={() => {
                         router.push(`/dashboard/martyrs/${user._id}`);
                        }}
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
          <div className="flex gap-2 mt-3">
            <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              +
            </button>

            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
