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
      <div className="container">
        <div className="header position-relative py-5">
          <h1 className=" text-danger"> آخر الأخبار </h1>
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
