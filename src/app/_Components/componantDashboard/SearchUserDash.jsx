"use client";

import styles from "../../css/styleDashboard/SuperVisor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useQuery } from "react-query";
import { useDashboard } from "@/app/context/DashboardContext";
import { ContextUser } from "@/app/context/Context";
import DisplayTawsec from "./DisplayTawsec";
import { useRouter } from "next/navigation";
export default function SearchUserDash() {
  const [disTawsec, setDisTawsec] = useState();
  const [imageProfile, setImageProfile] = useState("");
  const { getIdConfideint } = useDashboard();
  const [deleted, setDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idTawsek, setIdTawsek] = useState();
  const [openTawsek, setOpenTawsk] = useState(false);
  const [idloading, setIdLoading] = useState(false);
  const [nofile, setFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role } = useContext(ContextUser);
  ////////////////////////////////////

  //////////////////////////////
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////////
  function getAllUserSearch() {
    return axios.get(
      `https://syrianrevolution1.com/users/searchName?username=${name}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }
  const { data, refetch } = useQuery("userDashboardSearch", getAllUserSearch, {
    enabled: false,
    onSettled: () => {
      setIsLoading(false);
    },
  });
  //////////////////
  function handlesearch() {
    if (name !== "") {
      setIsLoading(true);
      refetch();
    }
  }
  ////////////////handle Tawsek///////////////////
  async function handleTawsek(e) {
    e.preventDefault();
    if (!imageProfile) {
      setFile(true);
      return;
    }
    setFile(false);
    const formData = new FormData();
    formData.append("image", imageProfile);
    setLoading(true);
    await axios
      .patch(`https://syrianrevolution1.com/users/doc/${idTawsek}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setLoading(false);
        if (result.data.user._id) {
          setOpenTawsk("");
          refetch();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  ////////////////delete user///////////////////
  async function deleteUser() {
    try {
      setIdLoading(true);
      const response = await fetch(
        `https://syrianrevolution1.com/users/${idDelete}/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const result = await response.json();
      if (
        result === "User Deleted Successfully" ||
        result === "Cannot read property 'role' of null"
      ) {
        refetch();
        setIdLoading(false);
        setIdDelete("");
        setDelete("");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();

  return (
    <>
      <div className={styles.SuperVisor}>
        {/* //////////////////// */}

        <div className={styles.allUser}>
          <div className={styles.containerTable}>
            <div
              className={styles.search}
              style={{ display: "flex", gap: "5px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder=" بحث باستخدام اسم المستخدم"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlesearch();
                  }
                }}
              />
              <button className="btn btn-primary" onClick={handlesearch}>
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
                  "بحث"
                )}
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>رقم الهاتف</th>
                  <th>الدور</th>

                  <th>توثيق الحساب</th>

                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      {user?.isConfident === true && user?.docImg !== null ? (
                        <span
                          className={styles.spanradiues}
                          style={{ backgroundColor: "green" }}
                        ></span>
                      ) : user?.docImg !== "" && user?.isConfident === false ? (
                        <span
                          className={styles.spanradiues}
                          style={{
                            backgroundColor: "yellow",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setDisTawsec("taws");
                            getIdConfideint(user._id);
                          }}
                        ></span>
                      ) : (
                        <span
                          className={styles.spanradiues}
                          style={{
                            backgroundColor: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setOpenTawsk(true);
                            setIdTawsek(user._id);
                          }}
                        ></span>
                      )}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="bg-danger p-1 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIdDelete(user._id);
                          if (user?.role === "owner") {
                            if (role === "owner") {
                              setDelete(true);
                            } else {
                              return alert("لا يمكنك حذف هذا الحساب");
                            }
                          }
                          if (user?.role === "admin") {
                            if (role === "owner") {
                              setDelete(true);
                            } else if (
                              role === "admin" &&
                              user?._id === localStorage.getItem("idUserLogin")
                            ) {
                              setDelete(true);
                            } else {
                              return alert("لا يمكنك حذف هذا الحساب");
                            }
                          }
                          if (
                            user?.role === "user" ||
                            user?.role === "supervisor"
                          ) {
                            setDelete(true);
                          }
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="bg-primary p-1 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (user?.role === "owner") {
                            if (role === "owner") {
                              router.push(
                                `/dashboard/userdash/updateuser/${user?._id}`
                              );
                            } else {
                              return alert("لا يمكنك التعديل علي هذا الحساب");
                            }
                          }

                          if (user?.role === "admin") {
                            if (role === "owner") {
                              router.push(
                                `/dashboard/userdash/updateuser/${user?._id}`
                              );
                            } else if (
                              role === "admin" &&
                              user?._id === localStorage.getItem("idUserLogin")
                            ) {
                              router.push(
                                `/dashboard/userdash/updateuser/${user?._id}`
                              );
                            } else {
                              return alert("لا يمكنك التعديل علي هذا الحساب");
                            }
                          }
                          if (
                            user?.role === "user" ||
                            user?.role === "supervisor"
                          ) {
                            router.push(
                              `/dashboard/userdash/updateuser/${user?._id}`
                            );
                          }
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ cursor: "pointer" }}
                        className="bg-primary p-1 text-white"
                        onClick={() => {
                          if (user?.role === "owner") {
                            if (role === "owner") {
                              router.push(`/dashboard/singleUser/${user._id}`);
                            } else {
                              return alert("لا يمكنك  رؤية هذا الحساب");
                            }
                          }
                          if (user?.role === "admin") {
                            if (role === "owner") {
                              router.push(`/dashboard/singleUser/${user._id}`);
                            } else if (
                              role === "admin" &&
                              user?._id === localStorage.getItem("idUserLogin")
                            ) {
                              router.push(`/dashboard/singleUser/${user._id}`);
                            } else {
                              return alert("لا يمكنك  رؤية هذا الحساب");
                            }
                          }
                          if (
                            user?.role === "user" ||
                            user?.role === "supervisor"
                          ) {
                            router.push(`/dashboard/singleUser/${user._id}`);
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ///////////////////////////// */}
        {disTawsec === "taws" && (
          <DisplayTawsec
            setDisTawsec={setDisTawsec}
            getAllUserDashboard={refetch}
          />
        )}
        {openTawsek && (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "#00011C80",
              top: 0,
              left: 0,
            }}
          >
            <div
              className="gh"
              style={{
                padding: "30px 10px",
                width: "40%",
                height: "35%",
                transform: "translateY(150px)",
                backgroundColor: "#F7F7F7",
                borderRadius: "5px",
                margin: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                ارفع صورة الوثيقة
              </p>
              {nofile && (
                <p
                  className="alert alert-secondary alerthemself"
                  style={{ transform: "translateY(-10px)", width: "100%" }}
                >
                  يرجي رفع الوثيقة
                </p>
              )}
              <label htmlFor="file-upload2" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="selfImg"
                id="file-upload2"
                type="file"
                className="form-control"
                onChange={handleChangeImageProfile}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translatex(-50%)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <button className="btn btn-danger" onClick={handleTawsek}>
                  {loading ? (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
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
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    " توثيق"
                  )}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setOpenTawsk("")}
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}
        {deleted && (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "#00011C80",
              top: 0,
              left: 0,
            }}
          >
            <div
              className="gh"
              style={{
                width: "40%",
                height: "45%",
                transform: "translateY(70px)",
                backgroundColor: "#F7F7F7",
                borderRadius: "5px",
                margin: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  transform: "translatey(50px)",
                  fontSize: "20px",
                }}
              >
                هل انت متاكد من رغبتك <br /> بحذف هذا المستخدم
              </p>
              <div
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translatex(-50%)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <button className="btn btn-danger" onClick={deleteUser}>
                  {idloading ? (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
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
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    " حذف"
                  )}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setDelete("")}
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
