import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../../utils/constants";
import * as Styled from "./Discover.styled";

export const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Styled.DiscoverContainer>
      <Styled.DiscoverTitle>Popular Topics</Styled.DiscoverTitle>
      <Styled.TopicsContainer>
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <Styled.TopicItemsContainer
              $active={topic === item.name ? true : false}>
              <Styled.TopicIcon>{item.icon}</Styled.TopicIcon>
              <Styled.TopicItem>{item.name}</Styled.TopicItem>
            </Styled.TopicItemsContainer>
          </Link>
        ))}
      </Styled.TopicsContainer>
    </Styled.DiscoverContainer>
  );
};
