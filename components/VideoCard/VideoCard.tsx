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
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    setIsPlaying((prev) => !prev);
    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
  };

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href="">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          <Link href="/">
            <video
              ref={videoRef}
              className="bg-gray-100 h-[300px] w-[200px] rounded-2xl cursor-pointer md:h-[400px] lg:h-[530px] lg:w[600px]"
              src={post.video.asset.url}
              loop></video>
          </Link>
          {isHover && (
            <div className="absolute flex gap-10 cursor-pointer bottom-6 left-8 md:left-11 lg:left-8 lg:justify-between w-[100px] md:w-[50px] p-3">
              <button
                className="text-2xl text-black lg:text-4xl"
                onClick={onVideoPress}>
                {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>
              <button
                className="text-2xl text-black lg:text-4xl"
                onClick={() => setIsVideoMuted((prev) => !prev)}>
                {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
