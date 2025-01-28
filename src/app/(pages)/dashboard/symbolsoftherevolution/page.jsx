"use client";

import React, { useState } from "react";
// import styles from "../../css/styleDashboard/RevolutionArchiveDash.module.css";
import Symbols from "./Symbols";
import Takrem from "./Takrem";
export default function SymbolsoftheRevolution() {
  const [choiceArchife, setChoiceArchife] = useState("symbol");

  return (
    <div>
      <div className='bg-[#0d3a5a] text-white text-[14px] h-[45px] p-[10px] pr-[20px] pb-[15px] translate-y-[20px]'>
        <p>ادخال البيانات / رموز الثورة</p>
      </div>
      <div className='m-[20px] mt-[20px] mx-auto w-[90%]'>
        <div className='mt-[50px]'>
          <span
            onClick={() => setChoiceArchife("symbol")}
           
            className={`revelotionactive ${choiceArchife === "symbol" ? 'bg-[#a5c3eb]' : "bg-[#e2dede]"}`}
          >
            رموز الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("takrem")}
            className={`revelotionactive ${choiceArchife === "takrem" ?'bg-[#a5c3eb]': "bg-[#e2dede]"}`}
          >
            بطاقة التكريم
          </span>
        </div>
      </div>
      {choiceArchife === "symbol" && <Symbols />}
      {choiceArchife === "takrem" && <Takrem />}
    </div>
  );
}
