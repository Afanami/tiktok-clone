import React from "react";
import { footerList1, footerList2, footerList3 } from "../../utils/constants";
import * as Styled from "./Footer.styled";

const List = ({ items, mt }: { items: string[]; mt: boolean }) => {
  return (
    <Styled.FooterList $mt={mt}>
      {items.map((item) => (
        <Styled.FooterItem key={item}>{item}</Styled.FooterItem>
      ))}
    </Styled.FooterList>
  );
};

export const Footer = () => {
  return (
    <Styled.FooterContainer>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <Styled.FooterCopyright>2022 TokTik</Styled.FooterCopyright>
    </Styled.FooterContainer>
  );
};
