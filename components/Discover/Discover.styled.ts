import tw from "tailwind-styled-components";

export const DiscoverContainer = tw.div`
  pb-6 
  xl:border-b-2 
  xl:border-gray-200
`;

export const DiscoverTitle = tw.p`
  hidden 
  m-3 
  mt-4 
  font-semibold 
  text-gray-500 xl:block
`;

export const TopicsContainer = tw.div`
  flex 
  flex-wrap 
  gap-3
`;

interface ITopicItemProps {
  $active: boolean;
}

export const TopicItemsContainer = tw.div<ITopicItemProps>`
  flex 
  items-center 
  justify-center 
  gap-2 
  px-3 
  py-2 
  ${(props: ITopicItemProps) => (props.$active ? "text-main" : "text-black")} 
  rounded 
  cursor-pointer 
  xl:border-2 
  hover:bg-primary 
  ${(props: ITopicItemProps) =>
    props.$active ? "xl:border-main" : "xl:border-gray-300 "} 
  xl:rounded-full
`;

export const TopicIcon = tw.span`
  text-2xl 
  font-bold 
  xl:text-md
`;

export const TopicItem = tw.div`
  hidden 
  font-medium 
  capitalize 
  text-md 
  xl:block
`;
