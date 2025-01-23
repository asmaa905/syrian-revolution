"use client";
import Image from "next/image";
import { useContext } from "react";
import { ContextUser } from "../../../../context/Context";
import EnterInformUser from "../EnterInformUser/EnterInformUser";
import SuccessAddInform from "../SuccessAddInform/SuccessAddInform";
import FaildAddInform from "../FaildAddInform/FaildAddForm";
import TawsikEmail from "../TawsikEmail/TawsikEmail";

export default function Header() {
  const { openAuth, setOpenAuth, allBackground } = useContext(ContextUser);

  function handleOpen() {
    setOpenAuth("enterinform");
    console.log("allbackground", allBackground);
  }

  return (
    <>
      <div className=" text-center relative overflow-hidden h-[400px]">
        {allBackground[0]?.image && (
          <Image
            src={`https://syrianrevolution1.com/backgroundImages/${allBackground[0]?.image}`}
            alt="mainpicture"
            layout="fill"
            priority
            className="z-0 absolute object-cover w-full top-0 right-0 left-0 bottom-0"
          />
        )}
        <div className="container   relative">
          <h1 className="hidden">الثورة السورية | الرئيسية</h1>
          <div className="w-1/2 text-right text-white flex flex-col justify-start items-start my-auto pt-[5rem] pb-[1rem]">
            <p className="font-arabic font-[400]   text-[#fff] text-[1rem] leading-[30px] w-[79%] mt-[1%] mb-[1rem] ">
              أهلا بك في موقعنا الرسمي ، حيث ستجد هنا كل ما تريد معرفته عن سوريا
              بداية من آخر الأخبار والتغطية المستمرة ، كما نحرص جاهدين أن يكون
              موقعنا بمثابة ملف توثيق لكل الأحداث والملفات التي حدثت ولا زالت
              تحدث ويتم حذفها من وسائل التواصل والمنصات المختلفة .. <br />
              نحن هنا لتوثيق الحدث ، كن شريكا معنا وسجل الآن لتحصل على ميزة
              التوثيق
            </p>{" "}
            <button
              className="ml-auto mt-3 px-12 py-2 bg-[#8f0101] text-white font-[400] text-[1rem] leading-[29px] border-[none] cursor-pointer rounded center"
              onClick={handleOpen}
            >
              أدخل بيانات
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render components */}
      {openAuth === "enterinform" && <EnterInformUser />}
      {openAuth === "successaddinform" && <SuccessAddInform />}
      {openAuth === "faild" && <FaildAddInform />}
      {openAuth === "tawsicEmail" && <TawsikEmail />}
    </>
  );
}
