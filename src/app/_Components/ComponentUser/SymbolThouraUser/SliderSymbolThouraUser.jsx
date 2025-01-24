"use client";

import React, { useState } from "react";
import Slider from "react-slick";

import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export default function SliderSymbolThouraUser() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  ///////////////////////////////////////////
  function getAllLastNews(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=symbols&page=${page}`
    );
  }
  const { data } = useQuery(
    ["SymbolsSliders654", page],
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
          ots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          ots: false,
        },
      },
    ],
  };
  return (
    <div>
      <div className="container">
        <div className="slider-container px-4 position-relative">
          <Slider {...settings}>
            {data?.data.map((sym, i) => (
              <div key={i} className="slide mx-2">
                <div className="image mb-2 mx-2 ">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${sym.selfImg}`}
                    alt="symbolThowra"
                    className=" w-100 slide-image"
                    style={{ height: "250px" }}
                  />
                </div>
                <p className="px-2" style={{ textAlign: "center" }}>
                  {sym?.name ? sym?.name : ""}
                  <br />
                  <small className="datedSlider">
                    {sym?.createdAt && sym?.createdAt.slice(0, 10)}
                  </small>
                  <button
                    className=" d-inline-block mx-1  rounded-3 btu"
                    onClick={() => router.push(`/newsDetails/${sym._id}`)}
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
            }}
          >
            <button onClick={handleNextPage} className="btn btn-secondary">
              +
            </button>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="btn btn-secondary"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
