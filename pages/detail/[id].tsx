import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser, IVideo } from "../../types";
import useAuthStore from "../../store/authStore";
import { LikeButton } from "../../components/LikeButton/LikeButton";
import { Comments } from "../../components/Comments/Comments";

interface IProps {
  postDetails: IVideo;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  let [volume, setVolume] = useState(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: { userProfile: IUser | any } = useAuthStore();

  const onVideoClick = () => {
    setIsPlaying((prev) => !prev);
    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
      videoRef.current.volume = volume;
    }
  }, [post, isVideoMuted, volume]);

  const handleLike = async (like: boolean) => {
    setDisabled(true);
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
      setDisabled(false);
    }
  };

  const addComment = async (e: React.FormEvent) => {
    // prevent reload
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="absolute top-0 left-0 flex flex-wrap w-full h-full bg-white lg:flex-nowrap">
      <div
        className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black"
        onMouseLeave={() => setShowVolumeControl(false)}>
        <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
          <button
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </button>
        </div>
        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}></video>
          </div>
        </div>
        <div className="absolute top-[45%] left-[40%]  cursor-pointer">
          {!isPlaying && (
            <button
              className="text-6xl text-white lg:text-8xl"
              onClick={onVideoClick}>
              <BsFillPlayFill />
            </button>
          )}
        </div>
        <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
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
            className="text-2xl text-white lg:text-4xl"
            onClick={() => {
              setIsVideoMuted((prev) => !prev);
              !isVideoMuted ? setVolume(0) : setVolume(0.1);
            }}
            onMouseEnter={() => setShowVolumeControl(true)}>
            {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
          </button>
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
              <div className="w-16 h-16 ml-4 md:w-20 md:h-20">
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </div>
              <div>
                <div className="flex flex-col gap-2 mt-3">
                  <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="px-10">
            <p className="text-gray-600 text-md ">{post.caption}</p>
          </div>

          <div className="py-2 px-9">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                disabled={disabled}
                handleLike={() => {
                  handleLike(true);
                }}
                handleDislike={() => {
                  handleLike(false);
                }}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
