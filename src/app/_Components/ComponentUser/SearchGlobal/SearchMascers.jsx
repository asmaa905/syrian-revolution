"use client";

import React, { useState } from "react";
import MainNav from "../MainNav/MainNav";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "../../../css/componantUser/SearchGlobal/SearchThree.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
export default function SearchMascers() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function searchList() {
    return axios.get(
      `https://syrianrevolution1.com/massacres/searchTitle?title=${name}`
    );
  }
  const { data, refetch } = useQuery("searchmascers", searchList, {
    enabled: false,
    onSettled: () => {
      setIsLoading(false);
    },
  });

  function handlesearch() {
    if (name !== "") {
      setIsLoading(true);
      refetch();
    }
  }

  return (
    <>
      <MainNav />
      <Navbar />
      <div className={style.MartyrsDash}>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <span
            style={{
              backgroundColor: "#C1D6F2",
              padding: "5px 20px",
              borderRadius: "25px",
              transform: "translate(-10px,30px)",
              display: "inline-block",
            }}
          >
           <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"   style={{ margin: "0 10px" }}/>{" "}

            ادخل البيانات هنا
          </span>
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
              transform: "translate(-10px,55px)",
              display: "inline-block",
              marginBottom: "30px",
            }}
          >
             <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"   style={{ margin: "0 10px" }}/>{" "}

            نتائج البحث
          </span>
          <div className="container py-2">
            <div className={style.SuperVisor} style={{ marginTop: "45px" }}>
              <div className="row gy-3 mb-4">
                {data?.data.map((e, i) => (
                  <div className="col-md-3" key={i}>
                    <div className="image mb-2">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e.profileImage}`}
                        alt="martyr"
                        className=" w-100 rounded-3 fimg"
                      />
                    </div>
                    <p>
                      {e?.title ? e?.title : ""}
                      <br />
                      <button
                        className="btu d-inline-block mx-1 px-3 rounded-3"
                        onClick={() => navigate(`/NewsDetailsMascers/${e._id}`)}
                      >
                        المزيد
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
