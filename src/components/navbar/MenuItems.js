import { GrUpdate } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import SignOut from "../authentication/SignOut";

export const MenuItems = [
  {
    title: "Update Profile",
    path: "/update-profile",
    cName: "dropdown-link",
    icon: <GrUpdate />,
  },
    {
    title: "Change Password",
    path: "/change-password",
    cName: "dropdown-link",
    icon: <GrPowerReset />,
  },
  {
    title: "Profile Details",
    path: "/profile-details",
    cName: "dropdown-link",
    icon: <ImProfile />,
  },
  {
    title: "",
    path: "/signout",
    cName: "dropdown-link",
    icon: <SignOut />,
  },
];

export default MenuItems;
