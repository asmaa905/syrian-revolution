import React from "react";
import Header from "../../_Components/ComponentUser/Header/Header";
import RegimeMassacresUser from "../../_Components/ComponentUser/GaraamSystem/RegimeMassacres/RegimeMassacresUser";
import MartyrsUser from "@/app/_Components/ComponentUser/GaraamSystem/Martyrs/MartyrsUser";
import MissingUser from "@/app/_Components/ComponentUser/GaraamSystem/Missing/MissingUser";
import DetaineesUser from "@/app/_Components/ComponentUser/GaraamSystem/Detainees/DetaineesUser";
import Head from "next/head";

export default function GraamSystem() {
  return <>
  <Head>
  <title>الثورة السورية |  ملفات النظام
  </title>

  <meta
          name="description"
          content="منصة إخبارية تقدم توثيقًا للشهداء، البحث عن المفقودين، ومعلومات حول المعتقلين. اعرف آخر الأخبار وساهم في إيصال صوت الضحايا."
        />
        <meta
          name="keywords"
          content="شهداء, مفقودين, معتقلين, توثيق, تكريم, حقوق الإنسان, العدالة"
        />
  </Head>
  <Header/>

  <div className=" max-w-screen-xl mx-auto">
  <div className="px-4 md:px-0  py-12">
  <h3 className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[170px] after:top-1/2 after:transform after:translate-y-1/2">
  ملفات النظام
</h3>

  </div>
</div>
<h1 className="hidden"></h1>
<RegimeMassacresUser/>
<MartyrsUser/>
<MissingUser/>
<DetaineesUser/>
  </>;
}
