"use client";

import React, { useState } from "react";
import styles from "../../../../css/styleDashboard/DataDisplaySite.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export default function DataSiteDaaeh() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  ///////////////////////////
  function getList(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/childData/search?category=martyr&responsibleAuthority=daaeh&page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }
  ///////////////////////
  const { data, isLoading } = useQuery(
    ["marterDaaehtruedisplayUser", page],
    () => getList(page),
    {
      keepPreviousData: true,
    }
  );
  ////////////////////////////
  ///////////////////////////
  function getList1(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/childData/search?category=adetaine&responsibleAuthority=daaeh&page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }
  ///////////////////////
  const { data: data1 } = useQuery(
    ["adetainedaaehtruedisplayUser", page],
    () => getList1(page),
    {
      keepPreviousData: true,
    }
  );
  ///////////////////////////
  function getList2(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/childData/search?category=missing&responsibleAuthority=daaeh&page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }
  ///////////////////////
  const { data: data2 } = useQuery(
    ["missingdaaehtruedisplayUser", page],
    () => getList2(page),
    {
      keepPreviousData: true,
    }
  );
  ///////////////////////////
  function getList3(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/massacres/search?responsibleAuthority=daaeh&page=${page}`
    );
  }
  ///////////////////////
  const { data: data3 } = useQuery(
    ["mascerdaaehtruedisplayUser", page],
    () => getList3(page),
    {
      keepPreviousData: true,
    }
  );

  ////////////////////////////
  ////////////////////////////
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
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className={styles.DataSiteLastNews}>
      <div className={styles.allUser}>
        <div className={`containerTable`}>
          <table>
            <thead>
              <tr>
                <th> اسم الملف </th>
                <th> اسم الناشر</th>

                <th>التصنيف</th>
                <th>البيانات المنشورة</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user?.user?.username}</td>
                  <td>{user.category}</td>
                  <td>
                    <button
                      className={`add `}
                      style={{
                        backgroundColor: "#3B9058",
                        color: "white",
                      }}
                      onClick={() => {
                        router.push(
                          `/dashboard/dataDisplaySite/dataChildDisplaySite/${user._id}`
                        );
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
              {data1?.data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user?.user?.username}</td>
                  <td>{user.category}</td>
                  <td>
                    <button
                      className={`add `}
                      style={{
                        backgroundColor: "#3B9058",
                        color: "white",
                      }}
                      onClick={() => {
                        router.push(
                          `/dashboard/dataDisplaySite/dataChildDisplaySite/${user._id}`
                        );
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
              {data2?.data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user?.user?.username}</td>
                  <td>{user.category}</td>
                  <td>
                    <button
                      className={`add `}
                      style={{
                        backgroundColor: "#3B9058",
                        color: "white",
                      }}
                      onClick={() => {
                        router.push(
                          `/dashboard/dataDisplaySite/dataChildDisplaySite/${user._id}`
                        );
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
              {data3?.data.map((user, index) => (
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
                          `/dashboard/dataDisplaySite/dataChildDisplaySitemascr/${user._id}`
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
        <div>
          <button onClick={handleNextPage} className="btn btn-primary">
            +
          </button>

          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="btn btn-primary"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
