import React from "react";
import { IVideo } from "../../types";
import { NextPage } from "next";

interface IProps {
  post: IVideo;
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  console.log(post.caption);
  return <div>VideoCard</div>;
};
