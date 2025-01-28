"use client";
import Image from "next/image";

import { useContext } from "react";
import { ContextUser } from "../../../context/Context";
import EnterInformUser from "../EnterInformUser/EnterInformUser";
import SuccessAddInform from "../SuccessAddInform/SuccessAddInform";
import FaildAddInform from "../FaildAddInform/FaildAddForm"; //
import TawsikEmail from "../TawsikEmail/TawsikEmail";

export default function Header() {
  const { openAuth, setOpenAuth, allBackground } = useContext(ContextUser);

  function handleOpen() {
    setOpenAuth("enterinform");
  }

  return (
    <>
      <div className="header-container perantHeader overflow-hidden">
        <h1 className="hidden">الثورة السورية | الرئيسية</h1>
        <div className="perantparhead z-10">
          <p className="perantpar">
            أهلا بك في موقعنا الرسمي ، حيث ستجد هنا كل ما تريد معرفته عن سوريا
            بداية من آخر الأخبار والتغطية المستمرة ، كما نحرص جاهدين أن يكون
            موقعنا بمثابة ملف توثيق لكل الأحداث والملفات التي حدثت ولا زالت تحدث
            ويتم حذفها من وسائل التواصل والمنصات المختلفة .. <br />
            نحن هنا لتوثيق الحدث ، كن شريكا معنا وسجل الآن لتحصل على ميزة
            التوثيق
          </p>{" "}
          <button
            className="head-btn"
            style={{ padding: "10px 0px" }}
            onClick={handleOpen}
          >
            أدخل بيانات
          </button>
        </div>
        {allBackground[0]?.image && (
          <Image
            src={`https://syrianrevolution1.com/backgroundImages/${allBackground[0]?.image}`}
            alt="mainpicture"
            layout="fill"
            priority
            className="head-img z-0"
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
