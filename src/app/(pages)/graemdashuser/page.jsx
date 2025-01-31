import DetaineesUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Detainees/DetaineesUser";
import MartyrsUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Martyrs/MartyrsUser";
import MissingUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Missing/MissingUser";
import RegimeMassacresUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/RegimeMassacres/RegimeMassacresUser";
import Header from "@/app/_Components/ComponentUser/Header/Header";
import Head from "next/head";
import React from "react";

export default function GraemdaShuser() {
  return <>
    <Head>
  <title>الثورة السورية |  ملفات داعش 

  </title>

  <meta
  name="description"
  content="ملفات داعش تقدم توثيقًا شاملاً للضحايا من شهداء ومفقودين ومعتقلين. منصة لإيصال صوت الضحايا وتوفير معلومات هامة عن الأحداث والجرائم المرتبطة بالتنظيم."
/>
<meta
  name="keywords"
  content="ملفات داعش, شهداء, مفقودين, معتقلين, توثيق, حقوق الإنسان, العدالة, الجرائم, الضحايا, العدالة الانتقالية, الإرهاب, مقاومة, تاريخ داعش, توثيق الجرائم"
/>
  </Head>
   <Header/>
   <div className="max-w-screen-xl mx-auto">
  <div className="px-4 md:px-0  py-12">
    <h3 className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[170px] after:top-1/2 after:transform after:translate-y-1/2">
     ملفات داعش 
     </h3>
  </div>
</div>
<h1 className="hidden"></h1>
<RegimeMassacresUser />
<MartyrsUser />
<MissingUser />
     
      <DetaineesUser />

  </>
  ;
}
