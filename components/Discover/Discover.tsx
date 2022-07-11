import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../../utils/constants";
import tw from "tailwind-styled-components";

const DiscoverContainer = tw.div`
  pb-6 
  xl:border-b-2 
  xl:border-gray-200
`;

const DiscoverTitle = tw.p`
  hidden 
  m-3 
  mt-4 
  font-semibold 
  text-gray-500 xl:block
`;

const TopicsContainer = tw.div`
  flex 
  flex-wrap 
  gap-3
`;

interface ITopicItemProps {
  $active: boolean;
}

const TopicItemsContainer = tw.div<ITopicItemProps>`
  flex 
  items-center 
  justify-center 
  gap-2 
  px-3 
  py-2 
  ${(props: ITopicItemProps) => {
    props.$active ? "text-main" : "text-black";
  }} 
  rounded 
  cursor-pointer 
  xl:border-2 
  hover:bg-primary 
  ${(props: ITopicItemProps) => {
    props.$active ? "xl:border-main" : "xl:border-gray-300 ";
  }} 
  xl:rounded-full
`;

const TopicIcon = tw.span`
  text-2xl 
  font-bold 
  xl:text-md
`;

const TopicItem = tw.div`
  hidden 
  font-medium 
  capitalize 
  text-md 
  xl:block
`;

export const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <DiscoverContainer>
      <DiscoverTitle>Popular Topics</DiscoverTitle>
      <TopicsContainer>
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <TopicItemsContainer $active={topic === item.name ? true : false}>
              <TopicIcon>{item.icon}</TopicIcon>
              <TopicItem>{item.name}</TopicItem>
            </TopicItemsContainer>
          </Link>
        ))}
      </TopicsContainer>
    </DiscoverContainer>
  );
};
