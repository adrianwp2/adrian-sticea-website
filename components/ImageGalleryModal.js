"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function ImageGalleryModal({ images }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openImageModal = (index) => {
        setSelectedIndex(index);
        document.getElementById("image-modal").showModal();
    };

    return (
        <>
            {images.map((image, i) => (
                <img
                    className="rounded cursor-pointer h-full sm:h-25 w-full sm:w-1/4 object-cover"
                    key={i}
                    src={`/${image}`}
                    onClick={() => openImageModal(i)}
                />
            ))}

            {/* Custom modal overlay with dark background */}
            <dialog id="image-modal" className="modal">
                <div className="modal-box w-screen sm:max-w-4xl relative bg-base-100 p-0 overflow-visible">
                    {/* Swiper navigation arrows outside the image */}
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        initialSlide={selectedIndex}
                        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
                        className="relative w-full"
                    >
                        {images.map((image, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={`/${image}`}
                                    alt={`Gallery ${i + 1}`}
                                    className=" max-w-full w-full h-auto rounded"
                                />
                            </SwiperSlide>
                        ))}
                        {/* Custom navigation buttons outside the image */}
                    </Swiper>
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
