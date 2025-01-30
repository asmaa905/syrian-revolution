"use client";

import { useState } from "react";
import styles from "../../../css/styleDashboard/AddSuperVisor.module.css";
import axios from "axios";
import Joi from "joi";
import { useUser } from "../../../context/Context";
export default function PaypalDashboard() {
  const [openAdd, setOpenAdd] = useState(false);
  const [message, setMessage] = useState({ category: "paypal" });

  const [loadingAdd, setLodingAdd] = useState(false);
  const [errorListUser, setErrorListUser] = useState([]);

  const { messageAndPaypal, getAllMessageAndPaypal } = useUser();

  function validationAddUser() {
    let schema = Joi.object({
      category: Joi.string().required(),
      content: Joi.string().required().messages({
        "string.empty": "   الحساب مطلوب",
        "any.required": "   الحساب مطلوب",
      }),
    });
    return schema.validate(message, { abortEarly: false });
  }

  const [icon, setImageAndPaypal] = useState("");
  function handleImg(e) {
    setImageAndPaypal(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser("");
      if (!icon) return alert("يرجي رفع الصورة");
      const formData = new FormData();
      formData.append("category", message.category);
      formData.append("content", message.content);
      formData.append("icon", icon);

      setLodingAdd(true);

      await axios
        .post(
          `https://syrianrevolution1.com/messagePaypal/add/${localStorage.getItem(
            "idUserLogin"
          )}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          console.log(result);
          if (result.data.success === "MessagePaypal added successfully") {
            setLodingAdd(false);
            setOpenAdd(false);
            getAllMessageAndPaypal();
          }
        })
        .catch((error) => {
          setLodingAdd(false);
          console.log(error);
        });
    }
  }
  async function handleDeletePaypal(id) {
    await axios
      .delete(
        `https://syrianrevolution1.com/messagePaypal/${id}/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        if (result.data === "MessagePaypal Deleted Successfully") {
          getAllMessageAndPaypal();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p> حساب بيبال</p>
      </div>

      <div className={styles.containerTable}>
        <table>
          <thead>
            <tr>
              <th>الحساب</th>
              <th>الصورة</th>
              <th> الحالة</th>
            </tr>
          </thead>
          <tbody>
            {messageAndPaypal &&
              messageAndPaypal
                .filter((e) => e.category === "paypal")
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e?.content}</td>
                    <td>
                      <img
                        src={`https://syrianrevolution1.com/messagePaypal/${e?.icon}`}
                        alt="paypal"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </td>

                    <td>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                        onClick={() => handleDeletePaypal(e?._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <button
          className={`${styles.add} btn btn-success`}
          onClick={() => setOpenAdd(true)}
        >
          اضافة حساب جديد
        </button>
      </div>

      {openAdd && (
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
              height: "fitcontent",
              transform: "translateY(150px)",
              backgroundColor: "#F7F7F7",
              borderRadius: "5px",
              margin: "auto",
            }}
          >
            {errorListUser &&
              errorListUser.map((error, index) => (
                <p
                  key={index}
                  className="bg-gray-200 text-gray-800 border border-gray-300 px-4 py-3 rounded alerthemself"
                  style={{ transform: "translatey(-10px)", width: "100%" }}
                >
                  {error[index].message}
                </p>
              ))}
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              اضافة الحساب
            </p>

            <input
              placeholder="حساب بيبال"
              type="text"
              className="form-control"
              onChange={(e) =>
                setMessage((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }))
              }
            />
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "10px", marginBottom: "9px" }}>الصورة</p>

              <label htmlFor="qw" className="customfileupload">
                {" "}
                ارفع الصورة هنا
              </label>
              <input
                type="file"
                className="form-control"
                id="qw"
                onChange={handleImg}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
                margin: "auto",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button className="btn btn-danger" onClick={handleSubmit}>
                {loadingAdd ? (
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
                  "اضافة"
                )}
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={() => {
                  setOpenAdd(false);
                  setErrorListUser("");
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
