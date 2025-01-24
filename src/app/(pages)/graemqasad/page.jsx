
import DetaineesUser from '@/app/_Components/ComponentUser/GaraamQasad/Detainees/DetaineesUser';
import MartyrsUser from '@/app/_Components/ComponentUser/GaraamQasad/Martyrs/MartyrsUser';
import MissingUser from '@/app/_Components/ComponentUser/GaraamQasad/Missing/MissingUser';
import RegimeMassacresUser from '@/app/_Components/ComponentUser/GaraamQasad/RegimeMassacres/RegimeMassacresUser';


export default function GraemQasad() {
  return     <>
  <div className=" max-w-screen-xl mx-auto">
  <div className="px-4 md:px-0  py-12">
            <h3 className="relative text-[28px] font-semibold text-red-600 after:content-[''] after:bg-gray-500 after:h-[1px] after:absolute after:left-0 after:right-[160px] after:top-1/2 after:transform after:translate-y-1/2"> ملفات قسد </h3>
          </div>
        </div>
        <RegimeMassacresUser />
  
        <MartyrsUser />
  
        <MissingUser />
  
        <DetaineesUser />
  </>;
}
