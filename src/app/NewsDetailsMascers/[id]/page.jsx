'use client'
import React, { useContext, useEffect, useState } from "react";


import axios from "axios";


import { ContextUser } from "@/context/Context";
// import AlertImageDash from "../../componantDashboard/AlertImageDash/AlertImageDash";
// import one from "../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSubscript } from "@fortawesome/free-solid-svg-icons";
// import Subscribes from "../subscribe/Subscribes";
import { useRouter } from "next/navigation";
export default function NewsDetailsMascers({params}) {
  const [single, setSingle] = useState([]);
  const { openAlert, openAlertStore, setOpenSubscrips, openSubscrips } =
    useContext(ContextUser);
  const { id } = params;
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
        <div className="max-w-screen-xl mx-auto" style={{ marginTop: "30px" }}>
          <div
            className="flex md:flex-row flex-col gap-4"
       
          >
            <div className="md:w-2/3 ">
              <h4 className="text-[24px] mb-[30px] font-medium">
                {" "}
                العنوان : {single?.title}
              </h4>
              <img
                src={`https://syrianrevolution1.com/postImages/${single?.profileImage}`}
                alt={single?.title}
                style={{ width: "100%", marginBottom: "30px" }}
              />
              <h6 className="mb-2"> التفاصيل : </h6>
              <p className="text-[25px] font-normal leading-9 mb-4"> {single?.details !== "undefined" ? single?.details : ""}</p>
              <h6 className="mb-2">المحافظة : </h6>
              <p className="text-[25px] font-normal leading-9 mb-4">
                {single?.governorate !== "undefined" ? single?.governorate : ""}
              </p>
              <h6 className="mb-2">تاريخ النشر</h6>
              <p className="datedetails">
                {single?.createdAt && single?.createdAt.slice(0, 10)}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                  {single?.user?.selfImg !== undefined &&
                  single?.user?.selfImg !== "undefined " &&
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
                    "imgone"
                    // <img
                    //   src={one}
                    //   alt="profile"
                    //   style={{
                    //     width: "50px",
                    //     height: "50px",
                    //     borderRadius: "50%",
                    //   }}
                    // />
                  )}
                  <p>{single?.user?.username}</p>
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
            <div className="lastSlider1 md:w-1/3 max-h-[700px] overflow-y-auto  px-[16px]">
              <div className=" muted p-2 overflow-hidden">
                {archief.slice(0, 50).map((e, i) => (
                  <div
                    className="flex border-bottom pb-2 pt-2 border-2 overflow-hidden gap-3"
                    style={{ backgroundColor: "#fdfafa" }}
                    key={i}
                  >
                    <div className="w-1/3">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e?.profileImage}`}
                        alt=  {e?.title}
                        className="w-100"
                      />
                    </div>
                    <div className="w-2/3">
                      <p className="text-[25px] leading-[38px] mb-4">
                        {e?.title}
                        <br />
                        <button
                          className=" btu d-inline-block mx-1 px-3 rounded-3"
                          onClick={() =>
                            router.id(`/NewsDetailsMascers/${e._id}`)
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
