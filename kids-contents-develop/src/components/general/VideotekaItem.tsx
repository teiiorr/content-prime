"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { Modal } from "antd";
import { X } from "lucide-react";

type VideotekaItemProps = {
  video: {
    id: number;
    videoSrc: string;
    title: string;
    description: string;
  };
};

export function VideotekaItem({ video }: VideotekaItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [durationLabel, setDurationLabel] = useState("0:00");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLoadedMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const duration = event.currentTarget.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const totalSeconds = Math.round(duration);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formatted =
        hours > 0
          ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          : `${minutes}:${String(seconds).padStart(2, "0")}`;

      setDurationLabel(formatted);
    },
    []
  );

  const modalVideoKey = useMemo(() => `${video.id}-${video.videoSrc}`, [video.id, video.videoSrc]);

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
        <video
          src={video.videoSrc}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
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

        <div className="absolute bottom-4 left-4 rounded-xl bg-white/70 px-3 py-1 text-xl font-medium text-gray-900">
          {durationLabel}
        </div>
      </div>
      <h3 className="text-gray-900 font-semibold text-xl">{video.title}</h3>

      <Modal
        centered
        open={isModalOpen}
        onCancel={toggleModal}
        className="videoteka-modal relative w-full sm:max-w-[560px] md:max-w-[760px] lg:max-w-[1040px]"
        footer={null}
        closeIcon={
          <span className="videoteka-modal-close">
            <X size={18} />
          </span>
        }
        styles={{
          mask: {
            backdropFilter: "blur(14px)",
            background: "rgba(2, 6, 23, 0.78)",
          },
          content: {
            padding: 0,
            overflow: "hidden",
            borderRadius: 28,
            background: "transparent",
            boxShadow: "none",
          },
          body: {
            padding: 0,
          },
        }}
        transitionName="videoteka-modal-motion"
        maskTransitionName="videoteka-modal-mask"
      >
        <div className="videoteka-modal-frame">
          <div className="videoteka-modal-head">
            <div className="videoteka-modal-meta">
              <div className="videoteka-modal-kicker">Videoteka</div>
              <h3 className="videoteka-modal-title">{video.title}</h3>
            </div>
          </div>

          <div className="aspect-[9/16] sm:aspect-video">
          <video
            key={modalVideoKey}
            ref={videoRef}
            src={video.videoSrc}
            controls
            preload="metadata"
            className="videoteka-modal-video"
            autoPlay
          />
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .videoteka-modal .ant-modal-content {
          background: transparent;
        }

        .videoteka-modal-frame {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          background:
            radial-gradient(circle at top, rgba(51, 65, 85, 0.38), rgba(2, 6, 23, 0.92) 58%),
            rgba(2, 6, 23, 0.96);
          box-shadow: 0 34px 90px -44px rgba(0, 0, 0, 0.8);
        }

        .videoteka-modal-head {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 16px 10px;
        }

        .videoteka-modal-meta {
          min-width: 0;
          text-align: center;
        }

        .videoteka-modal-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.56);
        }

        .videoteka-modal-title {
          margin: 6px 0 0;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.2;
          color: #ffffff;
        }

        .videoteka-modal-video {
          display: block;
          width: 100%;
          height: 100%;
          background: #000;
          object-fit: cover;
        }

        .videoteka-modal-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(10px);
        }

        .videoteka-modal-motion-enter,
        .videoteka-modal-motion-appear {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
        }

        .videoteka-modal-motion-enter-active,
        .videoteka-modal-motion-appear-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 220ms ease, transform 260ms ease;
        }

        .videoteka-modal-motion-leave {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .videoteka-modal-motion-leave-active {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          transition: opacity 180ms ease, transform 200ms ease;
        }

        .videoteka-modal-mask-enter,
        .videoteka-modal-mask-appear {
          opacity: 0;
        }

        .videoteka-modal-mask-enter-active,
        .videoteka-modal-mask-appear-active {
          opacity: 1;
          transition: opacity 220ms ease;
        }

        .videoteka-modal-mask-leave {
          opacity: 1;
        }

        .videoteka-modal-mask-leave-active {
          opacity: 0;
          transition: opacity 180ms ease;
        }

        @media (max-width: 639px) {
          .videoteka-modal .ant-modal {
            margin: 0;
            max-width: 100vw;
          }

          .videoteka-modal .ant-modal-content {
            min-height: 100svh;
            border-radius: 0;
          }

          .videoteka-modal-frame {
            min-height: 100svh;
            border: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .videoteka-modal-head {
            padding: 12px 14px 10px;
          }

          .videoteka-modal-title {
            font-size: 16px;
          }

          .videoteka-modal-close {
            width: 38px;
            height: 38px;
            background: rgba(15, 23, 42, 0.84);
          }
        }
      `}</style>
    </div>
  );
}
