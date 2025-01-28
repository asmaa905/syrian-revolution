"use client";

import React, { useState } from "react";
// import styles from "../../css/styleDashboard/RevolutionArchiveDash.module.css";
import Archief from "./Archief";
import Mozaharat from "./Mozaharat";
import Maarek from "./Maarek";
export default function RevolutionArchiveDash() {
  const [choiceArchife, setChoiceArchife] = useState("archife");
  return (
    <div>
      <div className='bg-[#0d3a5a] text-white text-[14px] h-[45px] p-[10px] pr-[20px] pb-[15px] translate-y-[20px]'>
        <p>ادخال البيانات / ارشيف الثورة</p>
      </div>
      <div className='m-[20px] mt-[20px] mx-auto w-[90%]'>
        <div className='mt-[50px]'>
          <span
            onClick={() => setChoiceArchife("archife")}
            className={`revelotionactive ${choiceArchife === "archife" ? 'bg-[#a5c3eb]' : "bg-[#e2dede]"}`}
          >
            الارشيف
          </span>
          <span
            onClick={() => setChoiceArchife("mozaharat")}
            className={`revelotionactive   ${choiceArchife === "mozaharat" ? 'bg-[#a5c3eb]' : "bg-[#e2dede]"}`}
          >
            المظاهرات
          </span>
          <span
            onClick={() => setChoiceArchife("maarek")}
            className={`revelotionactive ${choiceArchife === "maarek" ? 'bg-[#a5c3eb]' : "bg-[#e2dede]"}`}
          >
            معارك الثوار
          </span>
        </div>
      </div>
      {choiceArchife === "archife" && <Archief />}
      {choiceArchife === "mozaharat" && <Mozaharat />}
      {choiceArchife === "maarek" && <Maarek />}
    </div>
  );
}
