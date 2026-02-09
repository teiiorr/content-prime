"use client";

import React, { useCallback, useRef, useState } from "react";
import { Modal } from "antd";

type VideotekaItemProps = {
  video: {
    id: number;
    image: string;
    image2x: string;
    title: string;
    description: string;
    length: string;
  };
};

export function VideotekaItem({ video }: VideotekaItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => {
      if (prev) {
        videoRef.current?.pause();
      }
      return !prev;
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-3xl z-10 w-full aspect-video min-h-[216px] overflow-hidden relative flex items-center justify-center group">
        <img
          src={video.image}
          srcSet={`${video.image2x} 2x`}
          width="523"
          height="568"
          alt={`Video poster image ${video.id}`}
          loading="lazy"
          className="absolute inset-0 object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={toggleModal}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 outline-none border-none shadow-[0px_1.09px_1.09px_0px_#FFFFFF33_inset] backdrop-blur-lg hover:bg-white transition-all duration-300 hover:scale-105 relative z-10"
          aria-label={`Play video ${video.id}`}
        >
          <svg
            className="w-5 h-5 pl-1"
            viewBox="0 0 31 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.6676 14.2497C30.4798 15.2626 30.4798 17.7949 28.6676 18.8079L4.20251 32.4823C2.39028 33.4953 0.125 32.2291 0.125 30.2033L0.125001 2.85433C0.125001 0.82848 2.39029 -0.437672 4.20251 0.575251L28.6676 14.2497Z"
              fill="black"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-4 py-1 px-3 bg-white/70 rounded-xl text-gray-900 text-xl font-medium">
          {video.length}
        </div>
      </div>
      <h3 className="text-gray-900 font-semibold text-xl">{video.title}</h3>

      <Modal
        centered
        open={isModalOpen}
        onCancel={toggleModal}
        className="relative rounded-[20px] overflow-hidden sm:max-w-[500px] md:max-w-[650px] lg:max-w-[900px] w-full"
        footer={null}
      >
        <div className="aspect-[9/16] sm:max-h-none sm:aspect-video">
          <video
            ref={videoRef}
            src="/videos/intro_video.mp4"
            controls
            preload="metadata"
            className="w-full h-full absolute inset-0 object-cover"
            poster={video.image}
            autoPlay
          />
        </div>
      </Modal>
    </div>
  );
}
