"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function ProjectGallery({ images, projectTitle }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef(null);

  const openImageModal = (index) => {
    setSelectedIndex(index);
    document.getElementById("project-image-modal").showModal();
  };

  // Update Swiper when modal opens
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <>
      {/* 3 Column Grid */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="h-32 overflow-hidden rounded-lg border border-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openImageModal(index)}
          >
            <img
              src={`/${image}`}
              alt={`${projectTitle} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      <dialog id="project-image-modal" className="modal">
        <div className="modal-box w-screen sm:max-w-4xl relative bg-gray-900 p-0 overflow-visible">
          <div className="w-full h-[80vh] relative">
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              initialSlide={selectedIndex}
              onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
              className="w-full h-full"
            >
              {images.map((image, i) => (
                <SwiperSlide key={i} className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`/${image}`}
                      alt={`${projectTitle} - Image ${i + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Close button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-secondary absolute right-2 top-2 z-30">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
