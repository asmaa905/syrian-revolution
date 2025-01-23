"use client";

import React, { useContext, useEffect, useState } from "react";

// import one from '../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "@/context/Context";
import { useRouter } from "next/navigation";
// import Subscribes from "../subscribe/Subscribes";

export default function NewsDetails({params}) {

  const [single, setSingle] = useState([]);
  const { setOpenSubscrips, openSubscrips } = useContext(ContextUser);
  const { id } = params;
  useEffect(() => {
    axios
      .get(`https://syrianrevolution1.com/lists/${id}`)
      .then((result) => setSingle(result.data))
      .catch((error) => console.log(error));
  }, [id]);

  ///////////////////////////////
  const [archief, setArchirf] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`https://syrianrevolution1.com/lists/userview`)
      .then((result) => {
        setArchirf(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  ///////////////////////////////
  return (
    <>

      <div className="demonstrations py-3">
        <div className="max-w-screen-xl mx-auto" style={{ marginTop: "30px" }}>
          <div
            className="flex md:flex-row flex-col gap-4"


          >
            <div className="md:w-2/3 ">
              <h4  className="text-[24px] mb-[30px] font-medium">
              
                العنوان : {single?.name}
              </h4>

              {single?.images &&
                single?.images.length > 0 &&
                single?.images.map((image, index) => (
                  <div className="m-2">
                    <img
                      key={index}
                      loading="lazy"
                      src={`https://syrianrevolution1.com/postImages/${image.imgPath}`}
                      alt={image.description || "image"}
                      className="w-75 rounded-3 fimg h-75"
                      fetchpriority="high"
                    />
                    <p>{image.description}</p>
                  </div>
                ))}

              {single?.video && (
                <iframe
                  width="320"
                  height="240"
                  style={{ width: "100%", marginBottom: "30px" }}
                  className="gimg"
                  src={`https://syrianrevolution1.com/postImages/${single?.video}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Video"
                ></iframe>
              )}
              <h6> التفاصيل : </h6>
              <p> {single?.content !== "undefined" ? single?.content : ""}</p>
              <h6>مكان الخبر : </h6>
              <p>
                {single?.governorate !== "undefined" ? single?.governorate : ""}
              </p>
              <h6>رابط خارجي : </h6>
              <a
                style={{ marginBottom: "40px", display: "inline-block" }}
                href={single?.externalLinks}
                target="_blank"
                rel="noopener noreferrer"
              >
                {single?.externalLinks !== "undefined"
                  ? single?.externalLinks
                  : ""}
              </a>
              <h6>تاريخ النشر</h6>
              <p className="datedetails">
                {single?.createdAt && single?.createdAt.slice(0, 10)}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
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
                    "one"
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
                  <FontAwesomeIcon icon="fa-solid fa-subscript" />                </div>
              </div>
            </div>
            {/* /////////////////////// */}
            <div className="md:w-1/3 max-h-[700px] overflow-y-auto lastSlider1 px-[16px] ">
              <div className=" muted  overflow-hidden">
                {archief.slice(0, 50).map((e, i) => (
                  <div
                    className="flex border-bottom pb-2 pt-2 border-2 overflow-hidden gap-3"
                    style={{ backgroundColor: "#ECECEC" }}
                    key={i}
                  >
                    <div className="w-1/3">
                      {e.images[0]?.imgPath && (
                        <>
                          <img
                            src={`https://syrianrevolution1.com/postImages/${e?.images[0]?.imgPath}`}
                            alt="home"
                            className=" w-100 rounded-md fimg h-25"
                            fetchpriority="high"
                          />
                        </>
                      )}
                      {e?.video && (
                        <video
                          width="320"
                          height="140px"
                          style={{
                            width: "100%",
                            marginBottom: "30px",
                            height: "150px",
                          }}
                          className="w-100 rounded-3 fimg"
                          controls
                        >
                          <source
                            src={`https://syrianrevolution1.com/postImages/${e?.video}`}
                            type="video/mp4"
                          />
                          المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                        </video>
                      )}
                    </div>
                    <div className="w-2/3">
                      <p className="text-[25px] leading-[38px] mb-4">
                        {e?.name}
                        <br />
                        <button
                          className="bg-[#ffbaba] text-[15px] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"
                          onClick={() => router.push(`/newsDetails/${e._id}`)}
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
      </div>
      {openSubscrips && <Subscribes />}

    </>
  );
}
// grid grid-cols-[1fr_30%]