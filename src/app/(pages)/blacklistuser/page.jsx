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

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h1 className="  text-danger leading-[35px] text-[24px] text-[#dc3545] font-[500] pl-2">
            القائمة السوداء
          </h1>
        </div>
      </div>
      <FlagBlackListThree />
      <SliderBlackListThree />
      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h3 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">
            {" "}
            عملاء{" "}
          </h3>
        </div>
      </div>
      <FlagBlackList />
      <SliderBlackList />

      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="header position-relative py-[3rem]">
          <h3 className="  text-danger leading-[34px] text-[28px] text-[#dc3545] font-[500]">
            {" "}
            مجرمين الحرب{" "}
          </h3>
        </div>
      </div>
      <FlagBlackListTwo />
      <SliderBlackListTwo />
    </>
  );
}
