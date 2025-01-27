"use client";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { ContextUser } from "@/context/Context";
import profile_img from "../../../../assets/images/profile_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Subscribes from "@/app/_Components/ComponentUser/subscribe/Subscribes";
import AlertImageDash from "@/app/_Components/componantDashboard/AlertImageDash/AlertImageDash";

export default function NewsDetailsMascers({ params }) {
  const [single, setSingle] = useState([]);
  const { openAlert, openAlertStore, setOpenSubscrips, openSubscrips } =
    useContext(ContextUser);
  const { id } = React.use(params);
  useEffect(() => {
    async function getSingle() {
      await axios
        .get(`https://syrianrevolution1.com/massacres/${id}`)
        .then((result) => {
          setSingle(result.data);
        })
        .catch((error) => console.log(error));
    }
    getSingle();
  }, [id]);

  const [archief, setArchirf] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://syrianrevolution1.com/massacres/userView")
      .then((result) => {
        setArchirf(result.data.data);
      });
  }, []);
  /////////////////////////////

  return (
    <>
      {openAlert && <AlertImageDash src={openAlertStore} />}

      <div className="demonstrations py-3">
        <div
          className="max-w-screen-xl mx-auto container"
          style={{ marginTop: "30px" }}
        >
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:w-2/3 ">
              <h4 className="text-[24px] mb-[30px] leading-[28px] font-[500] text-[#212529]">
                {" "}
                العنوان : {single?.title}
              </h4>
              <img
                src={`https://syrianrevolution1.com/postImages/${single?.profileImage}`}
                alt={single?.title}
                style={{ width: "100%", marginBottom: "30px" }}
              />
              <h6 className="mb-2"> التفاصيل : </h6>
              <p className="text-[25px] leading-[38px] font-[400] text-[#212529]">
                {single?.details !== "undefined" ? single?.details : ""}
              </p>
              <h6 className="mb-2">المحافظة : </h6>
              <p className="text-[25px] leading-[38px] font-[400] text-[#212529]">
                {single?.governorate !== "undefined" ? single?.governorate : ""}
              </p>
              <h6 className="mb-2">تاريخ النشر</h6>
              <p className="datedetails text-[13px] leading-[20px] font-[400] text-[#212529]">
                {single?.createdAt && single?.createdAt.slice(0, 10)}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                  {single?.user?.selfImg !== undefined &&
                  single?.user?.selfImg !== "undefined " &&
                  single?.user?.selfImg !== "" ? (
                    <Image
                      src={`https://syrianrevolution1.com/images/${single?.user?.selfImg}`}
                      alt="profile"
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <Image
                      src={profile_img}
                      alt="profile"
                      width={40}
                      height={50}
                      style={{
                        borderRadius: "40%",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenAuth("update")}
                    />
                  )}
                  <p className="text-[25px] leading-[38px] font-[400] text-[#212529]">
                    {single?.user?.username}
                  </p>
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
                  <p
                    className="leading-[21px] text-[#fff] font-[400]"
                    style={{ fontSize: "14px", paddingTop: "15px" }}
                  >
                    مشاركة
                  </p>
                  <FontAwesomeIcon icon="fa-solid fa-subscript" />
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
                    <div className="md:w-1/3">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e?.profileImage}`}
                        alt={e?.title}
                        className="w-full"
                      />
                    </div>
                    <div className="w-2/3">
                      <p className="text-[25px] leading-[38px] mb-4">
                        {e?.title}
                        <br />
                        <button
                          className="btn bg-[#ffbaba] text-[15px] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"
                          onClick={() =>
                            router.push(`/NewsDetailsMascers/${e._id}`)
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
    </>
  );
}
