import React from "react";
import Head from "next/head";
import TwoArchief from "@/app/_Components/ComponentUser/ArchiefThouraUser/TwoArchief";
import OneArchief from "@/app/_Components/ComponentUser/ArchiefThouraUser/OneArchief";
import FlagArchiefTwo from "@/app/_Components/ComponentUser/ArchiefThouraUser/FlagArchiefTwo";
import LiberatedArchiefTwo from "@/app/_Components/ComponentUser/ArchiefThouraUser/LiberatedArchiefTwo";
import FlagArchief from "@/app/_Components/ComponentUser/ArchiefThouraUser/FlagArchief";
import LiberatedArchief from "@/app/_Components/ComponentUser/ArchiefThouraUser/LiberatedArchief";
import Header from "@/app/_Components/ComponentUser/Header/Header";

export default function ArchiefThourahUser() {
  return (
    <>
      <Head>
        <title>ارشيف الثورة | الثورة السورية </title>
        <meta name="description" content="ارشيف الثورة السورية" />
      </Head>
      <Header />

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h1 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">ارشيف الثورة</h1>
        </div>
      </div>
      <OneArchief />
      <TwoArchief />
      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3REM]">
          <h3 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">المظاهرات</h3>
        </div>
      </div>
      <LiberatedArchief />
      <FlagArchief />

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3REM]">
          <h3 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">معارك الثوار</h3>
        </div>
      </div>
      <LiberatedArchiefTwo />
      <FlagArchiefTwo />
    </>
  );
}
