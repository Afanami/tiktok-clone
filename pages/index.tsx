import type { NextPage } from "next";
import { IVideo } from "../types";
import axios from "axios";
import { VideoCard } from "../components/VideoCard/VideoCard";
import { NoResults } from "../components/NoResults/NoResults";

interface IProps {
  videos: IVideo[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos.map((video: IVideo) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
