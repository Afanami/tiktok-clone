import { IVideo } from "../types";
import axios from "axios";
import { VideoCard } from "../components/VideoCard/VideoCard";
import { NoResults } from "../components/NoResults/NoResults";
import { BASE_URL } from "../utils";

interface IProps {
  videos: IVideo[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos.map((video: IVideo) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text="No Videos" type="videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
