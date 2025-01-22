import React from "react";
import "../../../../css/componantUser/GaraamSystem/RegimeMassacres/RegimeMassacresUser.css";
import { useNavigate } from "react-router-dom";
import SliderGraamQasad from "../SliderGraamQasad";
import { useQuery } from "react-query";
import axios from "axios";
export default function RegimeMassacresUser() {
  const navigate = useNavigate();
  function getMascersSystem1() {
    return axios.get(
      "http://localhost:4500/massacres/search?responsibleAuthority=qasad&limit=8"
    );
  }
  const { data } = useQuery("oneMascersQasads1", getMascersSystem1, {
    cacheTime: 1800000,
  });

  return (
    <>
      <section
        className="regime"
        style={{ marginBottom: "100px" }}
        id="fiveone"
      >
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`http://localhost:4500/postImages/${e.profileImage}`}
                    alt="home"
                    className=" w-100 rounded-3 fimg"
                  />
                </div>
                <p>
                  {e?.title ? e?.title : ""}
                  <br />
                  <button
                    className="btu d-inline-block mx-1 px-3 rounded-3"
                    onClick={() => navigate(`/NewsDetailsMascers/${e._id}`)}
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
      <SliderGraamQasad />
    </>
  );
}
