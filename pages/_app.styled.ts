import tw from "tailwind-styled-components";

export const Container = tw.div`
  flex 
  gap-6 
  md:gap-20
`;

export const SidebarContainer = tw.div`
  h-[92vh] 
  overflow-hidden 
  xl:hover:overflow-auto
`;

export const ComponentContainer = tw.div`
  mt-4 
  flex 
  flex-col
  gap-10
  overflow-auto
  h-[88vh]
  videos 
  flex-1
`;
