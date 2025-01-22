import React from "react";
import "../../../../css/componantUser/GaraamSystem/Detainees/DetaineesUser.css";
import { useNavigate } from "react-router-dom";
import SliderGraemThree from "../SliderGraemThree";
import { useQuery } from "react-query";
import axios from "axios";
export default function DetaineesUser() {
  const navigate = useNavigate();
  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/childData/search?category=adetaine&responsibleAuthority=system&limit=8"
    );
  }
  const { data } = useQuery("adentaieSystem", getAllLastNews, {
    cacheTime: 1800000,
  });
  console.log(data);
  return (
    <>
      <section className="detainees" id="fourfour">
        <div className="container py-2">
          <div className="header position-relative py-5">
            <h3 className=" text-danger">المعتقلين</h3>
          </div>
          <div className="row gy-3 mb-4">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/imgData/${e.profileImage}`}
                    alt="martyr"
                    className=" w-100 rounded-3 fimg"
                  />
                </div>
                <p>
                  {e?.name ? e?.name : ""}
                  <br />
                  <button
                    className="btu d-inline-block mx-1 px-3 rounded-3"
                    onClick={() => navigate(`/NewsDetailsMartyr/${e._id}`)}
                  >
                    المزيد
                  </button>
                  <small className="datedSingle">
                    {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SliderGraemThree />
    </>
  );
}
