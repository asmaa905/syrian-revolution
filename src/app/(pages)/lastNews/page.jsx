import React from "react";
import Liberated from "@/app/_Components/ComponentUser/MainPage/Liberated/Liberated";
import FlagsUser from "@/app/_Components/ComponentUser/MainPage/FlagsUser/FlagsUser";
import RegimeMassacres from "@/app/_Components/ComponentUser/MainPage/RegimeMassacres/RegimeMassacresUser";
import Head from "next/head";
import Header from "@/app/_Components/ComponentUser/Header/Header";

export default function MainPage() {
  return (
    <>
      <Head>
        <title>الثورة السورية | اخر الاخبار</title>
      </Head>
      <Header />
      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h1 className=" text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">
            {" "}
            آخر الأخبار{" "}
          </h1>
        </div>
      </div>
      <RegimeMassacres />
      <Liberated />
      <div className="container">
        <FlagsUser />
      </div>
    </>
  );
}
