"use client";

import { useState } from "react";
import style from "../../../css/componantUser/RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UpdatedPassword({ userId }) {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const updatePass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `https://syrianrevolution1.com/users/success/${userId}`,
        { password }
      );
      if (data._id) {
        alert("تم تحديث كلمة المرور");
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`${style.RegisterUser}`}>
      <form
        onSubmit={(e) => updatePass(e)}
        className={`${style.formsSuccessRegister} `}
      >
        <div className={style.informSuccess}>
          <FontAwesomeIcon
            icon="fa-solid fa-circle-check"
            style={{ color: "green", fontSize: "40px", marginBottom: "20px" }}
          />

          <label
            htmlFor="password"
            style={{ textAlign: "start", marginBottom: "10px" }}
          >
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="كلمة المرور"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <button
              type="submit"
              className="px-2 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
              style={{ marginTop: "30px" }}
            >
              تحديث
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className=" px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
              style={{ marginTop: "30px" }}
            >
              رجوع
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
