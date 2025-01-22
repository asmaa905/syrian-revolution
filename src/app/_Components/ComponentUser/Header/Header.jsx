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
      <div className="relative text-center overflow-hidden h-[400px]">
        {" "}
        {/* Set a height for the container */}
        {/* Text content and button */}
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 w-1/2 text-right text-white leading-relaxed z-10">
          <p className="font-arabic text-lg md:text-xl leading-relaxed">
            أهلا بك في موقعنا الرسمي ، حيث ستجد هنا كل ما تريد معرفته عن سوريا
            بداية من آخر الأخبار والتغطية المستمرة ، كما نحرص جاهدين أن يكون
            موقعنا بمثابة ملف توثيق لكل الأحداث والملفات التي حدثت ولا زالت تحدث
            ويتم حذفها من وسائل التواصل والمنصات المختلفة .. <br />
            نحن هنا لتوثيق الحدث ، كن شريكا معنا وسجل الآن لتحصل على ميزة
            التوثيق
          </p>
          <button
            className="mt-3 px-12 py-2 bg-red-700 text-white font-bold rounded"
            onClick={handleOpen}
          >
            أدخل بيانات
          </button>
        </div>
        بب
        {/* Background Image */}
        {allBackground[0]?.image && (
          <Image
            src={`https://syrianrevolution1.com/backgroundImages/${allBackground[0]?.image}`}
            alt="mainpicture"
            layout="fill"
            priority
            className="w-full h-full object-cover z-0"
          />
        )}
      </div>

      {/* Conditionally render components */}
      {openAuth === "enterinform" && <EnterInformUser />}
      {openAuth === "successaddinform" && <SuccessAddInform />}
      {openAuth === "faild" && <FaildAddInform />}
      {openAuth === "tawsicEmail" && <TawsikEmail />}
    </>
  );
}
