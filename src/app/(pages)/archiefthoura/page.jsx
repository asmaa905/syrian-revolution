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
      <Heade />

      <div className="container">
        <div className="header position-relative py-5">
          <h1 className=" text-danger">ارشيف الثورة</h1>
        </div>
      </div>
      <OneArchief />
      <TwoArchief />
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">المظاهرات</h3>
        </div>
      </div>
      <LiberatedArchief />
      <FlagArchief />

      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">معارك الثوار</h3>
        </div>
      </div>
      <LiberatedArchiefTwo />
      <FlagArchiefTwo />
    </>
  );
}
