import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../../store/authStore";
import { IUser } from "../../types";

interface IProps {
  likes: any[];
  disabled: boolean;
  handleLike: () => void;
  handleDislike: () => void;
}

export const LikeButton = ({
  likes,
  disabled,
  handleLike,
  handleDislike,
}: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: { userProfile: IUser | any } = useAuthStore();
  const filterLikes = likes?.filter((like) => {
    return like._ref === userProfile?._id;
  });

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center justify-center mt-4 cursor-pointer">
        {alreadyLiked ? (
          <button
            className="p-2 rounded-full bg-primary md:p-4 text-main"
            onClick={handleDislike}
            disabled={disabled}>
            <MdFavorite className="text-lg md:text-2xl" />
          </button>
        ) : (
          <button
            className="p-2 rounded-full bg-primary md:p-4"
            onClick={handleLike}
            disabled={disabled}>
            <MdFavorite className="text-lg md:text-2xl" />
          </button>
        )}
        <p className="font-semibold text-md">{likes?.length | 0}</p>
      </div>
    </div>
  );
};
