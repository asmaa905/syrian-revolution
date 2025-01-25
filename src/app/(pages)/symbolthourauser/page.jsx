import React from "react";
import Liberated from "@/app/_Components/ComponentUser/SymbolThouraUser/Liberated/Liberated";
import SliderSymbolThouraUser from "@/app/_Components/ComponentUser/SymbolThouraUser/SliderSymbolThouraUser";
import LiberatedTwo from "@/app/_Components/ComponentUser/SymbolThouraUser/Liberated/LiberatedTwo";
import SliderTakrem from "@/app/_Components/ComponentUser/SymbolThouraUser/SliderTakrem";
import Head from "next/head";
import Header from "@/app/_Components/ComponentUser/Header/Header";

export default function SymbolThouraUser() {
  return (
    <>
      <Head>
        <title>الثورة السورية | رموز الثورة</title>
        <meta name="description" content="رموز الثورة السورية" />
      </Head>
      <Header />

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h1 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">
            رموز الثورة
          </h1>
        </div>
      </div>
      <Liberated />
      <SliderSymbolThouraUser />

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h3 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">
            بطاقات التكريم
          </h3>
        </div>
      </div>
      <LiberatedTwo />
      <SliderTakrem />
    </>
  );
}
