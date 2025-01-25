import DetaineesUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Detainees/DetaineesUser";
import MartyrsUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Martyrs/MartyrsUser";
import MissingUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/Missing/MissingUser";
import RegimeMassacresUser from "@/app/_Components/ComponentUser/GaraamDaaehUser/RegimeMassacres/RegimeMassacresUser";
import Header from "@/app/_Components/ComponentUser/Header/Header";
import React from "react";

export default function GraemdaShuser() {
  return <>
   <Header/>
   <div className="max-w-screen-xl mx-auto">
  <div className="px-4 md:px-0  py-12">
    <h3 className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[170px] after:top-1/2 after:transform after:translate-y-1/2"> ملفات داعش </h3>
  </div>
</div>
<RegimeMassacresUser />
<MartyrsUser />
<MissingUser />
     
      <DetaineesUser />

  </>
  ;
}
