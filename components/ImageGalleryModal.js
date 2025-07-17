"use client";

import { useState } from "react";

export default function ImageGalleryModal({ images }) {
    const [selectedImage, setSelectedImage] = useState("");

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        document.getElementById("image-modal").showModal();
    };

    return (
        <>
            {images.map((image, i) => (
                <img
                    className="rounded cursor-pointer"
                    key={i}
                    src={image}
                    onClick={() => openImageModal(image)}
                />
            ))}

            <dialog id="image-modal" className="modal">
                <div className="modal-box max-w-4xl">
                    <img
                        src={selectedImage}
                        alt="Selected image"
                        className="w-full h-auto rounded"
                    />
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-secondary absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}
