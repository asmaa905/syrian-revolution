"use client"
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {useRouter} from 'next/navigation'
export default function Liberated() {
  const router = useRouter();

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=symbols&limit=5"
    );
  }
  const { data } = useQuery("symbol", getAllLastNews, {
    cacheTime: 1800000,
  });
  return (
    <div id="twoone">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row gy-3 mb-5">
            <div className="md:w-1/2 h-100">
              <div className="right h-100">
                <div className="image mb-4">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.selfImg}`}
                    alt="symbolThowra"
                    className=" w-full rounded-3 gimg"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <p>
                    {data?.data[0]?.name}
                    <br />
                    <button
                      className="btn d-inline-block mx-1 px-3 rounded-3 "
                      onClick={() =>
                        router.push(`/newsDetails/${data?.data[0]?._id}`)
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {data?.data.length > 0 &&
                        data?.data[0]?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="row gy-2">
                {data?.data.length > 0 &&
                  data?.data.slice(1, 5).map((e, i) => (
                    <div className="md:w-1/2" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="symbolThowra"
                              className=" w-full rounded-3h-[195px]"
                            />
                          </div>
                          <div className="text">
                            <p style={{ marginTop: "10px" }}>
                              {e?.name}
                              <br />
                              <button
                                className="btn d-inline-block mx-1 px-3 rounded-3"
                                onClick={() =>
                                  router.push(`/newsDetails/${e?._id}`)
                                }
                              >
                                المزيد
                              </button>
                              <small className="datedSingle">
                                {e?.createdAt && e?.createdAt.slice(0, 10)}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
