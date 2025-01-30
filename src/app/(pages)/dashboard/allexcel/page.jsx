import SearchExcel from "./SearchExcel";
export default function AllExcelDash() {
  
  return (
    <>
      <div className="bg-[#0d3a5a] text-white text-sm h-[45px] px-5 py-[10px] pt-[15px] translate-y-[20px]" style={{ display: "flex", gap: "10px" }}>
        <p>المطلوبين للنظام</p>
      </div>
      <SearchExcel />
    </>
  

  );
}
