import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { BASE_PATH, topics } from "../utils/constants";
import { IUser } from "../types";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(
    null
  );
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: IUser | any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setIsLoading(true);
    setInvalidFileType(false);

    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setInvalidFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_PATH}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 py-10 lg:py-20 justify-center bg-lightGray">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-x-20 gap-y-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="mt-1 text-gray-400 text-md">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] cursor-pointer hover:border-red-300 hover:bg-hover">
            {isLoading ? (
              <button
                type="button"
                className="flex flex-row items-center px-5 py-2 text-white rounded bg-main cursor-no-drop"
                disabled>
                <svg
                  className="w-5 h-5 mr-3 border-2 border-gray-400 rounded-full border-t-white animate-spin"
                  viewBox="0 0 24 24"></svg>
                Uploading...
              </button>
            ) : (
              <>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      className="h-full bg-black rounded-xl"
                      loop
                      controls></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center text-xl font-bold">
                        <FaCloudUploadAlt className="text-6xl text-gray-300 animate-bounce" />
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="mt-10 text-sm leading-10 text-center text-gray-400">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10minutes <br />
                        Less than 2GB
                      </p>
                      <p className="p-2 mt-10 font-medium text-center text-white rounded outline-none bg-main text-md w-52">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </>
            )}
            {invalidFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 min-w-[260px]">
          <label className="font-medium text-md">Caption</label>
          <input
            type="text"
            value={caption}
            className="p-2 border-2 border-gray-200 rounded outline-none text-md"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <label className="font-medium text-md">Choose a Category</label>
          <select
            className="p-2 text-black capitalize border-2 border-gray-200 rounded outline-none cursor-pointer text-md lg:p-4"
            defaultValue={"Please select a Category"}
            onChange={(e) => {
              setCategory(e.target.value);
            }}>
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="p-2 text-gray-700 capitalize bg-white outline-none text-md hover:bg-hover "
                value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              type="button"
              className="p-2 font-medium border-2 border-gray-300 rounded outline-none text-md w-28 lg:w-44 hover:bg-hover"
              onClick={() => {}}>
              Discard
            </button>
            <button
              type="button"
              className="p-2 font-medium text-white border-2 rounded outline-none bg-main text-md w-28 lg:w-44"
              onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
