import React, { useState, useEffect, useRef, Fragment } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { IVideo } from "../../types";

interface IProps {
  post: IVideo;
  isShowingOnHome?: boolean;
}

export const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    setIsPlaying((prev) => !prev);
    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
      videoRef.current.volume = volume;
    }
  }, [isVideoMuted, volume]);

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${_id}`}>
          <video
            loop
            src={video.asset.url}
            className="w-[250px] rounded-xl cursor-pointer"></video>
        </Link>
        <div className="flex items-center gap-2 ml-4 -mt-8">
          <p className="flex items-center gap-1 text-lg font-medium text-white">
            <BsPlay className="text-2xl" />
            {likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${_id}`}>
          <p className="mt-5 text-gray-800 cursor-pointer text-md w-210">
            {caption}
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200 w-[80%] sm:w-[100%]">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href={`/profile/${postedBy._id}`}>
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={postedBy.image}
                alt="profile photo"
                layout="responsive"
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                  {postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="mt-2 font-normal ">{caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div
          className="rounded-3xl"
          onMouseOver={() => setIsHover(true)}
          onMouseEnter={() => {
            setShowVolumeControl(false);
          }}
          onMouseLeave={() => setIsHover(false)}>
          <Link href={`/detail/${_id}`}>
            <video
              ref={videoRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={video.asset.url}
              loop></video>
          </Link>

          {isHover && (
            <div className="absolute flex gap-10 cursor-pointer bottom-6 left-6 lg:left-0 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              <button
                className="p-2 text-2xl text-gray-600 border-2 border-gray-600 rounded-full lg:text-4xl"
                onClick={onVideoClick}>
                {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>
              <div
                className="relative"
                onMouseEnter={() => setShowVolumeControl(true)}>
                {showVolumeControl && (
                  <input
                    className="absolute hidden rotate-270 md:block"
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.valueAsNumber);
                    }}
                    onMouseLeave={() => setShowVolumeControl(false)}
                  />
                )}
                <button
                  className="p-2 text-2xl text-gray-600 border-2 border-gray-600 rounded-full lg:text-4xl"
                  onClick={() => {
                    setIsVideoMuted((prev) => !prev);
                    !isVideoMuted ? setVolume(0) : setVolume(0.1);
                  }}>
                  {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
