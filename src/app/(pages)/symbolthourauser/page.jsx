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

      <div className="container">
        <div className="header position-relative py-5">
          <h1 className=" text-danger">رموز الثورة</h1>
        </div>
      </div>
      <Liberated />
      <SliderSymbolThouraUser />

      <div className="container">
        <div className={`header position-relative py-5 `}>
          <h3 className=" text-danger ">بطاقات التكريم </h3>
        </div>
      </div>
      <LiberatedTwo />
      <SliderTakrem />
    </>
  );
}
