"use client";

import React, { useState } from "react";
// import styles from "../../../css/styleDashboard/AddEcecl.module.css";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ExeclSheet() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState();
  const [user, setUser] = useState({});
  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    await axios
      .post("https://syrianrevolution1.com/sheet/addOne", user, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.success === "Row added successfully") {
          setSuccess(true);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className='w-full h-full' onSubmit={handleSubmit}>
      <div className="bg-[#0d3a5a] text-white text-[14px] h-[45px] p-[10px] pr-[20px] pb-[15px] translate-y-[20px]" >
        <p> اضافة بيانات / مطلوبين للنظام </p>
      </div>
      <form action="" >
        {success && (
          <p className="alert alert-secondary alerthemself">تم الاضافة بنجاح</p>
        )}
        <div  className="mx-auto pt-7 w-4/5">
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الاسم</label>
              <input
                type="text"
                name="name"
                placeholder="اسم المستخدم"
                className="form-control plachoderevloution"
                onChange={handlechange}
                required
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الكنية</label>
              <input
                type="text"
                name="nickname"
                placeholder=" الكنية "
                className="form-control plachoderevloution"
                onChange={handlechange}
                required
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> اسم الاب</label>
              <input
                type="text"
                name="fatherName"
                placeholder="  اسم الاب"
                className="form-control plachoderevloution"
                onChange={handlechange}
                required
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> اسم الام </label>
              <input
                type="text"
                name="motherName"
                placeholder="      اسم الام "
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> المواليد</label>
              <input
                type="date"
                name="year"
                placeholder="   المواليد"
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> مكان المواليد </label>
              <input
                type="text"
                name="place"
                placeholder="       مكان المواليد "
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> المحافظة</label>
              <input
                type="text"
                name="governorate"
                placeholder="   المحافظة"
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> المدينة </label>
              <input
                type="text"
                name="city"
                placeholder="        المدينة "
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الحي</label>
              <input
                type="text"
                name="elhy"
                placeholder="   الحي"
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الجرم </label>
              <input
                type="text"
                name="grom"
                placeholder="        الجرم "
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الملاحظات</label>
              <input
                type="text"
                name="notes"
                placeholder="   الملاحظات"
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> الجهة المسؤولة </label>
              <input
                type="text"
                name="responsibleAuthority"
                placeholder="        الجهة المسؤولة "
                className="form-control plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className='containerinputrevloution'>
            <div className='inputrevloution'>
              <label htmlFor="" className="text-[12px]"> معلومات اضافية</label>
              <input
                type="text"
                name="extraInfo"
                placeholder="   معلومات اضافية"
                className="form-contro plachoderevloution"
                onChange={handlechange}
              />
            </div>
          </div>
        </div>
        <div className={'btnsrevloution'}>
          <button
            className={`addrevloution`}
            style={{ color: "white", backgroundColor: "green" }}
          >
            {loading ? (
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
              " اضافة"
            )}
          </button>
          <button
            className={`addrevloution`}
            style={{ border: "1px solid red", color: "red" }}
            onClick={() => router.push('/dashboard/allexcel')}
          >
            الغاء
          </button>
        </div>
      </form>
    </div>
  );
}
