import tw from "tailwind-styled-components";

export const FooterContainer = tw.div`
  hidden 
  mt-6 
  xl:block
`;
interface IFooterListProps {
  $mt: boolean;
}

export const FooterList = tw.div<IFooterListProps>`
  flex 
  flex-wrap 
  gap-2
  ${(props: IFooterListProps) => (props.$mt ? "mt-5" : "")}
`;
export const FooterItem = tw.p` 
  text-sm 
  text-gray-400 
  cursor-pointer 
  hover:underline
`;

export const FooterCopyright = tw.p`
  mt-5 
  text-sm 
  text-gray-400
`;
