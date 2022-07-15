import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import { VideoCard } from "../../components/VideoCard/VideoCard";
import { UserDetails } from "../../components/UserDetails/UserDetails";
import { NoResults } from "../../components/NoResults/NoResults";

import { IUser, IVideo } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  profileData: {
    user: IUser;
    userVideos: IVideo[];
    userLikedVideos: IVideo[];
  };
}

const Profile = ({ profileData }: IProps) => {
  const [currentTabName, setCurrentTabName] = useState("videos");
  const [videosList, setVideosList] = useState<IVideo[]>([]);

  const { user, userVideos, userLikedVideos } = profileData;
  const userDetailsCustomStyles = {
    imageContainer: "w-16 h-16 md:w-32 md:h-32",
    width: 120,
    height: 120,
    detailsContainer: "flex flex-col justify-center",
    userText: "md:text-2xl tracking-wider justify-center",
    userNameText: "md:text-xl",
  };

  useEffect(() => {
    if (currentTabName === "videos") {
      setVideosList(userVideos);
    } else if (currentTabName === "liked") {
      setVideosList(userLikedVideos);
    }
  }, [currentTabName, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex w-full gap-6 mb-4 bg-white md:gap-10">
        <UserDetails user={user} styles={userDetailsCustomStyles} />
      </div>

      <div>
        <div className="flex w-full gap-10 my-10 bg-white border-gray-200 border-b-[1px]">
          <button
            className={`text-xl font-semibold mt-2  ${
              currentTabName === "videos"
                ? "border-b-[1px] border-black"
                : "text-gray-400"
            }`}
            onClick={() => {
              setCurrentTabName("videos");
            }}>
            Videos
          </button>
          <button
            className={`text-xl font-semibold mt-2  ${
              currentTabName === "liked"
                ? "border-b-[1px] border-black"
                : "text-gray-400"
            }`}
            onClick={() => {
              setCurrentTabName("liked");
            }}>
            Liked
          </button>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList?.length ? (
            videosList.map((post: IVideo, idx: number) => (
              <VideoCard key={idx} post={post} isShowingOnHome={false} />
            ))
          ) : (
            <NoResults
              text={`No ${
                currentTabName[0].toUpperCase() + currentTabName.slice(1)
              } Yet`}
              type="videos"
            />
          )}
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
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { profileData: data },
  };
};

export default Profile;
