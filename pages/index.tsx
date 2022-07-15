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
          <VideoCard key={video._id} post={video} isShowingOnHome={true} />
        ))
      ) : (
        <NoResults text="No Videos" type="videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
