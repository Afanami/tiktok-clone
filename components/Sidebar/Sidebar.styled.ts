import tw from "tailwind-styled-components";

export const ToggleButton = tw.button`
  block 
  m-2 
  mt-3 
  ml-4 
  text-xl 
  xl:hidden
`;

export const SidebarContainer = tw.div`
  flex 
  flex-col 
  justify-start 
  w-20 
  p-3 
  mb-10 
  border-r-2 
  border-gray-100 
  xl:w-400 
  xl:border-0
`;

export const LinkContainer = tw.div`
  border-gray-200 
  xl:border-b-2 
  xl:pb-4
`;

export const LinkContentContainer = tw.div`
  flex 
  items-center 
  gap-3 
  hover:bg-primary 
  p-3 
  justify-center 
  xl:justify-start 
  cursor-pointer 
  font-semibold 
  text-main 
  rounded
`;

export const LinkIconContainer = tw.span`
  text-2xl
`;

export const LinkText = tw.p`
  hidden 
  text-xl 
  xl:block
`;

// export const LoginContainer = tw.div`
//   hidden
//   px-2
//   py-4
//   xl:block
// `;

// export const LoginText = tw.p`
//   text-gray-400
// `;

// export const LoginButtonContainer = tw.div`
//   pr-4
// `;

// export const LoginButton = tw.button`
//   bg-white
//   text-lg
//   text-main
//   border-[1px]
//   border-main
//   font-semibold
//   px-6
//   py-3
//   rounded-md
//   outline-none
//   w-full
//   mt-3
//   cursor-pointer
//   hover:text-white
//   hover:bg-main
// `;
