import { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { VideoCard } from "../../components/VideoCard/VideoCard";
import { UserDetails } from "../../components/UserDetails/UserDetails";
import { NoResults } from "../../components/NoResults/NoResults";

import { IUser, IVideo } from "../../types";
import { BASE_URL } from "../../utils";

import useAuthStore from "../../store/authStore";

interface IProps {
  videos: IVideo[];
}

const Search = ({ videos }: IProps) => {
  const [currentTabName, setCurrentTabName] = useState("accounts");
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full w-[90%]">
      <div className="flex w-full gap-10 my-7 bg-white border-gray-200 border-b-[1px] ">
        <button
          className={`text-xl font-semibold mt-2  ${
            currentTabName === "accounts"
              ? "border-b-[1px] border-black"
              : "text-gray-400"
          }`}
          onClick={() => {
            setCurrentTabName("accounts");
          }}>
          Accounts
        </button>
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
      </div>

      {currentTabName === "accounts" ? (
        <div className="flex flex-col gap-4">
          {searchedAccounts?.length ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex items-center gap-3 pb-4 font-semibold border-b-2 border-gray-200 rounded cursor-pointer">
                  <UserDetails
                    user={user}
                    styles={{
                      width: 50,
                      height: 50,
                      detailsContainer: "block",
                    }}
                  />
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No account results for ${searchTerm}`}
              type="videos"
            />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
          {videos?.length ? (
            videos.map((video: IVideo, idx: number) => (
              <VideoCard key={idx} post={video} isShowingOnHome={false} />
            ))
          ) : (
            <NoResults
              text={`No video results for ${searchTerm}`}
              type="videos"
            />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: data },
  };
};

export default Search;
