"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
export default function SliderDaaehThree() {
   const router = useRouter();
  const [page, setPage] = useState(1);
  function getAllLastNews() {
    return axios.get(
      `https://syrianrevolution1.com/childData/search?category=adetaine&responsibleAuthority=daaeh&page=${page}`
    );
  }

  const { data } = useQuery(
    ["adetainegdaaehSystemSliderse", page],
    () => getAllLastNews(page),
    {
      keepPreviousData: true,
      cacheTime: 1800000,
    }
  );
  ///////////////////////
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  ///////////////////

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "gray" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "gray" }}
        onClick={onClick}
      />
    );
  }
  let settings = {
    dots: false,
    infinite: data?.data.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="container">
        <div className="slider-container px-4 position-relative">
          <Slider {...settings}>
            {data?.data.map((e, i) => (
              <div key={i} className="slide mx-2 text-center">
                <div className="image mb-2 mx-2 ">
                  <img
                    src={`https://syrianrevolution1.com/imgData/${e.profileImage}`}
                    alt={e?.name}
                    className=" w-100 slide-image"
                    style={{ height: "250px" }}
                  />
                </div>
                <p className="px-2">
                  {e?.name ? e?.name : ""}
                  <br />
                  <small className="datedSlider">
                    {" "}
                    {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                  <button
                            className="bg-[#ffbaba] d-inline-block mx-1 rounded-md mt-[10px] px-[10px] -translate-y-[5px]"
                    onClick={() => router.push(`/NewsDetailsMartyr/${e._id}`)}
                  >
                    المزيد
                  </button>
                </p>
              </div>
            ))}
          </Slider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:'10px',
              marginTop:"15px",
            }}
          >
            <button onClick={handleNextPage}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"

             >
              +
            </button>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"

            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
