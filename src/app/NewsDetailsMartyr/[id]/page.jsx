'use client'
import React, { useContext, useEffect, useState } from "react";
// import MainNav from "../MainNav/MainNav";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

import { ContextUser } from "@/context/Context";
import { useRouter } from "next/navigation";
// import one from "../.. ";
// import AlertImageDash from "../../componantDashboard/AlertImageDash/AlertImageDash";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSubscript } from "@fortawesome/free-solid-svg-icons";
// import Subscribes from "../subscribe/Subscribes";
export default function NewsDetailsMartyr({params}) {
  console.log(params)
  const [single, setSingle] = useState([]);
  const { openAlert, openAlertStore, setOpenSubscrips, openSubscrips } =
    useContext(ContextUser);
  const { id } = params;
  useEffect(() => {
    async function getSingle() {
      await axios
        .get(`https://syrianrevolution1.com/childData/${id}`)
        .then((result) => {
          setSingle(result.data.childData);
        })
        .catch((error) => console.log(error));
    }
    getSingle();
  }, [id]);

  ///////////////////////////////
  const [archief, setArchirf] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://syrianrevolution1.com/childData/userView")
      .then((result) => {
        setArchirf(result.data.data);
      });
  }, []);

  return (
    <>
      {openAlert && <AlertImageDash src={openAlertStore} />}
 
      <div className="demonstrations py-3" style={{ marginBottom: "30px" }}>
        <div className="max-w-screen-xl mx-auto" style={{ marginTop: "30px" }}>
          <div
            className="flex md:flex-row flex-col gap-4"
           
          >
            <div className="md:w-2/3 ">
              <h4 className="text-[24px] mb-[30px] font-medium"> الاسم : {single?.name}</h4>
              <img
                src={`https://syrianrevolution1.com/imgData/${single?.profileImage}`}
                alt="from single new"
                style={{ width: "100%", marginBottom: "30px" }}
                className="gimg"
              />
              <h6> اسم الاب : </h6>
              <p>
                {" "}
                {single?.fatherName !== "undefined" ? single?.fatherName : ""}
              </p>
              <h6> اسم الام : </h6>
              <p>
                {" "}
                {single?.motherName !== "undefined" ? single?.motherName : ""}
              </p>
              <h6> الكنية : </h6>
              <p> {single?.nikeName !== "undefined" ? single?.nikeName : ""}</p>
              <h6> التفاصيل : </h6>
              <p> {single?.details !== "undefined" ? single?.details : ""}</p>
              <h6>المحافظة : </h6>
              <p>
                {single?.governorate !== "undefined" ? single?.governorate : ""}
              </p>
              <h6>تاريخ الميلاد : </h6>
              <p>
                {single?.dateOfBirth ? single?.dateOfBirth.slice(0, 10) : ""}
              </p>
              <h6>تاريخ النشر</h6>
              <p className="datedetails">
                {single?.createdAt && single?.createdAt.slice(0, 10)}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {single?.user?.selfImg !== undefined &&
                    single?.user?.selfImg !== "undefined" &&
                    single?.user?.selfImg !== "" ? (
                      <img
                        src={`https://syrianrevolution1.com/images/${single?.user?.selfImg}`}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <img
                        // src={one}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    )}

                    <p>{single?.user?.username}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    height: "40px",
                    backgroundColor: "#2FB9EE",
                    padding: "0 20px",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSubscrips(true)}
                >
                  <p style={{ fontSize: "14px", marginTop: "12px" }}>مشاركة</p>
                  {/* <FontAwesomeIcon icon={faSubscript} /> */}
                </div>
              </div>
            </div>
            {/* /////////////////////// */}
            <div className="md:w-1/3 max-h-[700px] overflow-y-auto lastSlider1 px-[16px]">
              <div className=" muted p-2 overflow-hidden">
                {archief.slice(0, 50).map((e, i) => (
                  <div
                    className="flex border-bottom pb-2 pt-2 border-2 overflow-hidden gap-3"
                    style={{ backgroundColor: "#fdfafa" }}
                    key={i}
                  >
                    <div className="w-1/3">
                      <img
                        src={`https://syrianrevolution1.com/imgData/${e?.profileImage}`}
                        alt="lastNews"
                        className="w-full"
                      />
                    </div>
                    <div className="w-2/3">
                      <p className="text-[25px] leading-[38px] mb-4">
                        {e?.name}
                        <br />
                        <button
                                                  className="bg-[#ffbaba] text-[15px] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"

                          onClick={() =>
                            router.push(`/NewsDetailsMartyr/${e._id}`)
                          }
                        >
                          المزيد
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {openSubscrips && <Subscribes />}
      </div>
      {/* <Footer /> */}
    </>
  );
}
