import React from "react";
import Head from "next/head";
import SliderBlackListThree from "@/app/_Components/ComponentUser/BlackListUser/SliderBlackListThree";
import FlagBlackListThree from "@/app/_Components/ComponentUser/BlackListUser/FlagBlackListThree";
import SliderBlackListTwo from "@/app/_Components/ComponentUser/BlackListUser/SliderBlackListTwo";
import FlagBlackListTwo from "@/app/_Components/ComponentUser/BlackListUser/FlagBlackListTwo";
import SliderBlackList from "@/app/_Components/ComponentUser/BlackListUser/SliderBlackList";
import FlagBlackList from "@/app/_Components/ComponentUser/BlackListUser/FlagBlackList";
import Header from "@/app/_Components/ComponentUser/Header/Header";

export default function BlackListUser() {
  return (
    <>
      <Head>
        <title>الثورة السورية | القائمة السوداء</title>
        <meta name="description" content="  القائمة السوداء" />
      </Head>
      <Header />

      <div className="container">
        <div className="header position-relative py-5">
          <h1 className=" text-danger"> القائمة السوداء </h1>
        </div>
      </div>
      <FlagBlackListThree />
      <SliderBlackListThree />
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> عملاء </h3>
        </div>
      </div>
      <FlagBlackList />
      <SliderBlackList />

      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> مجرمين الحرب </h3>
        </div>
      </div>
      <FlagBlackListTwo />
      <SliderBlackListTwo />
    </>
  );
}
