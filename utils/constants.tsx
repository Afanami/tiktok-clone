import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";

// dev
export const BASE_PATH = "http://localhost:3000";
// live
// export const BASE_URL = "http://";

export const topics = [
  {
    name: "development",
    icon: <BsCode />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Careers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "Toktik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "Toktik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
