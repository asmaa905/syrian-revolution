"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "../../../css/styleDashboard/ResponseLastChild.module.css";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFile, faFileZipper } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { ContextUser, useUser } from "../../context/Context";
// import one from "../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
export default function DataSiteResponseMassacre() {
  const [martyrDisplay, setMartyrDataDisplay] = useState([]);
  const [loadingdel, setLoadingDel] = useState(false);
  const { getMascersUser, role } = useUser();
  const { setOpenAlert, setOpenAlertStore } = useContext(ContextUser);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function getMartyr() {
      await axios
        .get(`https://syrianrevolution1.com/massacres/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          setMartyrDataDisplay(result.data);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getMartyr();
  }, [id]);
  function openImage(src) {
    setOpenAlert(true);
    setOpenAlertStore(src);
  }
  async function handleDeletePost() {
    setLoadingDel(true);
    await axios
      .delete(
        `https://syrianrevolution1.com/massacres/${id}/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data === "massacres Deleted Successfully") {
          setLoadingDel(false);
          navigate("/dashboard/dataDisplaySite");
          getMascersUser();
        }
      })
      .catch((error) => console.log(error));
    setLoadingDel(false);
  }
  return (
    <div className={styles.DisplayMartysDash}>
      {" "}
      <div className={`headDashboard`}>
        <p> البيانات المعروضة بالموقع</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
          transform: "translatex(-5px)",
        }}
        className="aoomedia"
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            {martyrDisplay?.user?.selfImg !== undefined &&
            martyrDisplay?.user?.selfImg !== "undefined" &&
            martyrDisplay?.user?.selfImg !== "" ? (
              <img
                src={`https://syrianrevolution1.com/images/${martyrDisplay?.user?.selfImg}`}
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

            <p>{martyrDisplay?.user?.name}</p>
          </div>
        </div>
        {role === "admin" || role === "owner" ? (
          <div>
            <h6>الوثيقة الشخصية : </h6>
            <img
              src={`https://syrianrevolution1.com/images/${martyrDisplay?.user?.docImg}`}
              alt="profile"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
              onClick={() => {
                openImage(
                  `https://syrianrevolution1.com/images/${martyrDisplay?.user?.docImg}`
                );
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.allDetailseRight}>
          <div className={styles.detailsright}>
            <h6>العنوان : </h6>
            <p>{martyrDisplay?.title}</p>
          </div>

          <div className={styles.detailsright}>
            <h6> المحافظة : </h6>
            <p>
              {martyrDisplay?.governorate !== undefined &&
              martyrDisplay?.governorate !== "undefined"
                ? martyrDisplay?.governorate
                : "لم تتم الاضافة"}{" "}
            </p>
          </div>
          <div className={styles.detailsright}>
            <h6>الجهة المسؤؤلة : </h6>
            <p>
              {" "}
              {martyrDisplay?.responsibleAuthority !== undefined &&
              martyrDisplay?.responsibleAuthority !== "undefined"
                ? martyrDisplay?.responsibleAuthority
                : "لم تتم الاضافة"}{" "}
            </p>
          </div>
          <div className={styles.detailsright}>
            <h6> الصورة : </h6>
            <br />
            <p>
              {" "}
              {martyrDisplay?.profileImage &&
              martyrDisplay?.profileImage === "undefined" ? (
                "لم تتم الاضافة"
              ) : martyrDisplay?.profileImage !== "undefined" ? (
                <img
                  src={`https://syrianrevolution1.com/postImages/${martyrDisplay?.profileImage}`}
                  alt="martyr"
                  style={{ width: "100px", cursor: "pointer" }}
                  onClick={() => {
                    openImage(
                      `https://syrianrevolution1.com/postImages/${martyrDisplay?.profileImage}`
                    );
                  }}
                />
              ) : (
                "لم تتم الاضافة"
              )}{" "}
            </p>
          </div>
          <div className={styles.detailsright}>
            <h6> الوثائق و الملفات : </h6>
            <br />
            <div>
              {" "}
              {martyrDisplay?.documents !== undefined &&
              martyrDisplay?.documents !== "undefined"
                ? martyrDisplay?.documents.map((doc, index) => (
                    <div key={index} style={{ display: "inline" }}>
                      {doc.slice(-4).toLowerCase() === ".jpg" ||
                      doc.slice(-4).toLowerCase() === ".png" ||
                      doc.slice(-5).toLowerCase() === ".jpeg" ? (
                        <img
                          src={`https://syrianrevolution1.com/postImages/${doc}`}
                          alt="documents"
                          style={{ width: "100px" }}
                          onClick={() => {
                            openImage(
                              `https://syrianrevolution1.com/postImages/${doc}`
                            );
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".pdf" ||
                      doc.slice(-4) === ".doc" ||
                      doc.slice(-5) === ".docx" ? (
                        <a
                          href={`https://syrianrevolution1.com/postImages/${doc}`}
                          style={{ margin: "0 15px" }}
                        >
                          {/* <FontAwesomeIcon
                            icon={faFile}
                            style={{
                              fontSize: "50px",
                              transform: "translateY(15px)",
                            }}
                          /> */}
                        </a>
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".mp4" ? (
                        <video controls>
                          <source
                            src={`https://syrianrevolution1.com/postImages/${doc}`}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".zip" ? (
                        <a
                          href={`https://syrianrevolution1.com/postImages/${doc}`}
                        >
                          {/* <FontAwesomeIcon icon={faFileZipper} /> */}
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
                : "لم تتم الاضافة"}{" "}
            </div>
          </div>
        </div>
        <div className={styles.detailsLeft}>
          <div>
            <h6>شرح مفصل : </h6>{" "}
            {martyrDisplay?.details !== undefined &&
            martyrDisplay?.details !== "undefined"
              ? martyrDisplay?.details
              : "لم تتم الاضافة"}{" "}
          </div>
        </div>
      </div>
      <div className={styles.btnbottom}>
        <button
          className="btn btn-warning"
          onClick={() =>
            navigate(
              `/dashboard/dataChildDisplaySitemascrupdate/${martyrDisplay._id}`
            )
          }
        >
          تعديل
        </button>
        <button className="btn btn-danger" onClick={handleDeletePost}>
          {loadingdel ? (
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
            "حذف"
          )}
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          رجوع
        </button>
      </div>
    </div>
  );
}
