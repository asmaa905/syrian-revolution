"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import style from "../../../../css/componantDashboard/DataSite/SearchedDash.module.css";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SearchMascersDashboard() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  function searchList() {
    return axios.get(
      `https://syrianrevolution1.com/massacres/searchTitle?title=${name}`
    );
  }
  const { data, refetch } = useQuery("searchmascersDashboard", searchList, {
    enabled: false,
    onSettled: () => {
      setIsLoading(false);
    },
  });
  console.log(data);
  function handlesearch() {
    if (name !== "") {
      setIsLoading(true);
      refetch();
    }
  }
  return (
    <>
      <div>
        <div className={style.inputSearch}>
          <div>
            <label htmlFor="">الاسم</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="الاسم"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ transform: "translateY(10px)" }}
            onClick={handlesearch}
          >
            {isLoading ? (
              <div className="spinner-border text-secondary" role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only"></span>
              </div>
            ) : (
              " بحث"
            )}
          </button>
        </div>

        <span
          style={{
            backgroundColor: "#C1D6F2",
            padding: "5px 20px",
            borderRadius: "25px",
            transform: "translate(-10px,35px)",
            display: "inline-block",
            marginBottom: "30px",
          }}
        >
          <FontAwesomeIcon
            style={{ margin: "0 10px" }}
            icon={faMagnifyingGlass}
          />{" "}
          نتائج البحث
        </span>
      </div>
      <div className={`containerTable`}>
        <table>
          <thead>
            <tr>
              <th> عنوان الخبر</th>
              <th>اسم الناشر</th>
              <th> التصنيف</th>
              <th>البيانات المنشورة</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user, index) => (
              <tr key={index}>
                <td>{user.title}</td>
                <td>{user?.user?.username}</td>
                <td>masscers</td>
                <td>
                  <button
                    className={`add `}
                    style={{
                      backgroundColor: "#3B9058",
                      color: "white",
                    }}
                    onClick={() => {
                      router.push(
                        `/dashboard/dataChildDisplaySitemascr/${user._id}`
                      );
                    }}
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
