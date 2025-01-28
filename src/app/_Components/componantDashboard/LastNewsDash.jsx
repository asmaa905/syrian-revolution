"use client";

import React, { useEffect, useState } from "react";
import styles from "../../css/styleDashboard/LastNew.module.css";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";

export default function Black() {
  const navigate = useNavigate();
  const [addData, setAddData] = useState({
    category: "lastNews",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
  const [imageProfiles, setImageProfiles] = useState([]);
  const [video, setVideo] = useState(null);

  function handleChangeImageProfile(e) {
    const files = Array.from(e.target.files);
    console.log(files);

    files.forEach((file) => {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setImageProfiles((prevImages) => [
          ...prevImages,
          { file, caption: "" },
        ]);
        setVideo(null);
      } else if (fileType.startsWith("video/")) {
        setVideo(file);
        setImageProfiles([]);
      } else {
        console.log("Unsupported file type.");
      }
    });
  }

  useEffect(() => {
    console.log(video, "Video state updated");
  }, [video]);

  function handleCaptionChange(index, e) {
    const newCaption = e.target.value;
    setImageProfiles((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  }

  function handleChange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function validationAddUser() {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "عنوان الخبر مطلوب",
        "any.required": "عنوان الخبر مطلوب",
      }),
      category: Joi.string().required().messages({
        "string.empty": "الفئة مطلوبة",
        "any.required": "الفئة مطلوبة",
      }),
      content: Joi.string().allow("").messages({
        "string.base": "المحتوى يجب أن يكون نصًا",
      }),
      governorate: Joi.string().allow("").messages({
        "string.base": "المحافظة يجب أن تكون نصًا",
      }),
      externalLinks: Joi.string().allow("").messages({
        "string.base": "الروابط الخارجية يجب أن تكون نصًا",
      }),
      images: Joi.array()
        .min(1)
        .when("video", {
          is: Joi.exist(),
          then: Joi.array().min(0), // إذا كان هناك فيديو، الصور ليست مطلوبة
          otherwise: Joi.array().min(1).messages({
            "array.min": "يجب رفع صورة أو فيديو",
          }),
        }),
      video: Joi.any().optional().messages({
        "any.base": "الفيديو غير صحيح",
      }),
    });

    const hasImagesOrVideo = imageProfiles.length > 0 || video !== null;

    if (!hasImagesOrVideo) {
      return {
        error: {
          details: [
            {
              message: "يجب رفع صورة أو فيديو",
              path: ["images"],
              type: "custom",
            },
          ],
        },
      };
    }

    return schema.validate(
      { ...addData, images: imageProfiles, video: video },
      { abortEarly: false }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await submitNewsRequest("publish");
  }

  async function saveNews(e) {
    e.preventDefault();
    await submitNewsRequest("save");
  }

  async function submitNewsRequest(type) {
    setSuccessAdd(false);
    setErrorBackUser(null);

    const { error } = validationAddUser();
    if (error) {
      setErrorListUser(error.details);
    } else {
      setErrorListUser(null);

      const formData = new FormData();
      formData.append("name", addData.name);
      formData.append("category", addData.category);
      formData.append("content", addData.content);
      formData.append("externalLinks", addData.externalLinks);
      formData.append("governorate", addData.governorate);

      imageProfiles.forEach((image, index) => {
        formData.append(`images`, image.file);
        formData.append(`imageDescriptions`, image.caption);
      });
      const visibility = type === "save" ? "خاص بي" : "العامة";
      formData.append("visibility", visibility);

      if (video) formData.append("video", video);

      try {
        type === "publish" ? setLoading(true) : setSaveLoading(true);

        const url = `https://syrianrevolution1.com/lists/${localStorage.getItem(
          "idUserLogin"
        )}`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();

        type === "publish" ? setLoading(false) : setSaveLoading(false);

        if (result._id) {
          setSuccessAdd(true);
          setErrorBackUser(null);
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        type === "publish" ? setLoading(false) : setSaveLoading(false);
      }
    }
  }

  return (
    <div className={styles.LastNewsDash}>
      <div className="headDashboard">
        <p>ادخال البيانات / اخر الاخبار</p>
      </div>
      <div className={styles.informLastNews}>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(0)", width: "100%" }}
            >
              {error.message}
            </p>
          ))}
        {successAdd && (
          <p
            className="alert alert-success alerthemself"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            تمت الاضافة بنجاح
          </p>
        )}
        {errorBackUser &&
          errorBackUser?.error === "Cannot read property '0' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(0)", width: "100%" }}
            >
              يرجى رفع الصورة
            </p>
          )}

        <div className={styles.input}>
          <div className={styles.inp1}>
            <label htmlFor=""> عنوان الخبر </label>
            <input
              type="text"
              className="form-control"
              placeholder="عنوان الخبر"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inp1}>
            <p style={{ fontSize: "10px", marginBottom: "5px" }}>
              ارفع اكثر من صورة أو فيديو (إجباري)
            </p>
            <label htmlFor="f1" className="customfileupload">
              {" "}
              ارفع من هنا
            </label>
            <input
              id="f1"
              type="file"
              className="form-control"
              name="selfImg"
              onChange={handleChangeImageProfile}
              multiple
            />
          </div>
        </div>

        {imageProfiles.length > 0 && (
          <div className={`d-flex flex-wrap justify-content-center`}>
            {imageProfiles.map((image, index) => (
              <div key={index}>
                {image.file instanceof File && (
                  <div className="m-2">
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt={`Image ${index}`}
                      className="w-100 rounded-3 fimg"
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="نص الصورة"
                      value={image.caption}
                      onChange={(e) => handleCaptionChange(index, e)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.input}>
          <div className={styles.inp1}>
            <label htmlFor=""> مكان الخبر</label>
            <input
              type="text"
              className="form-control"
              placeholder="مكان الخبر"
              name="governorate"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inp1}>
            <label htmlFor=""> روابط خارجية (يوتيوب) - اختياري</label>
            <input
              type="text"
              className="form-control"
              placeholder="رابط خارجي"
              name="externalLinks"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inp2}>
          <label htmlFor=""> محتوى الخبر</label>
          <textarea
            name="content"
            placeholder="محتوى الخبر"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.btnbottom}>
          <button
            className="add btn btn-success rounded-pill"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="spinner-border text-secondary" role="status">
                                    <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
<span className="sr-only"></span>
              </div>
            ) : (
              "إضافة"
            )}
          </button>
          <button
            className=" btn btn-outline-success rounded-5"
            onClick={saveNews}
          >
            {saveLoading ? (
              <div className="spinner-border text-secondary" role="status">
                                    <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
<span className="sr-only"></span>
              </div>
            ) : (
              "حفظ"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
