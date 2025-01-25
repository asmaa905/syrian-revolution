"use client";

import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function SliderBlackList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  ///////////////////////////////////////////
  function getAllLastNews() {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=Traitors&page=${page}`
    );
  }

  const { data } = useQuery(["Traitors3", page], () => getAllLastNews(page), {
    keepPreviousData: true,
    cacheTime: 1800000,
  });
  ///////////////////////
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  /////////////////////////////////
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
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
    <div>
      <div className="container max-w-screen-xl mx-auto px-4 md:px-0 py-4">
        <div className="slider-container px-4 position-relative">
          <Slider {...settings}>
            {data?.data.map((sym, i) => (
              <div className="slide mx-2" key={i}>
                <div className="image mb-2 mx-2 ">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${sym.selfImg}`}
                    alt="symbolThowra"
                    className=" w-full slide-image"
                    style={{ height: "250px" }}
                  />
                </div>

                <p
                  className="px-2 font-[400] text-[25px] leading-[38px] text-[#212529]"
                  style={{ textAlign: "center" }}
                >
                  {sym?.name ? sym?.name : ""}
                  <br />
                  <small className="datedSlider  text-[12px] leading-[18px] font-[400] text-[#808080]">
                    {sym?.createdAt && sym?.createdAt.slice(0, 10)}
                  </small>
                  <button
                    className="btn bg-[#ffbaba] text-[#000] font-[400] border-none text-[15px] leading-[23px] mt-[10px] outline-none p-[0_10px] translate-y-[-5px] d-inline-block mx-1 px-3 rounded-[0.5rem]"
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
              gap: "3px",
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
