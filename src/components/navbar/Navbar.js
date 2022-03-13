import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MenuItems } from "./MenuItems";
import { NotificationMenuItems } from "./NotificationMenuItems";
import { useAuth } from "../../contexts/AuthContext";
import forstaLogo from "../images/forstaLogo.jpg";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showDropdown = () => setDropdown(!dropdown);
  const showNotificationDropdown = () =>
    setNotificationDropdown(!notificationDropdown);
  const closeMobileMenu = () => setClick(false);
  const { currentUser } = useAuth();

  // useEffect(() => {
  //   document.addEventListener('mousedown', () => {
  //     setDropdown(true)
  //   })
  // })

  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <nav className="navbar">
          <Link to="#" className="menu-bars">
            {currentUser && (
              <FaIcons.FaBars className="hamburger" onClick={showSidebar} />
            )}
          </Link>
          <div className="nav-title">
            <div>
              <img className="Forsta-logo" src={forstaLogo} />
            </div>
            {!currentUser && (
              <Link to="#" className="navbar-logo" onClick={closeMobileMenu}>
                CC Library
              </Link>
            )}
            {currentUser && (
              <Link
                to="/cc-library"
                className="navbar-logo"
                onClick={closeMobileMenu}
              >
                CC Library
              </Link>
            )}
          </div>
          <div>
            {currentUser && (
              <ul className={click ? "Nav-menu active" : "Nav-menu"}>
                <li className="nav-item">
                  <Link to="#" className="nav-links" onClick={closeMobileMenu}>
                    <BsBell onClick={showNotificationDropdown} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-links">
                    <CgProfile onClick={showDropdown} />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <nav>
          <ul
            onClick={showDropdown}
            className={!dropdown ? "dropdown-menu clicked" : "dropdown-menu"}
          >
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setDropdown(true)}
                  >
                    {item.icon}
                    <span className="dropdown-span">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav>
          <ul
            onClick={showNotificationDropdown}
            className={
              !notificationDropdown
                ? "dropdown-notification clicked"
                : "dropdown-notification"
            }
          >
            {NotificationMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setNotificationDropdown(false)}
                  >
                    {item.icon}
                    <span className="dropdownNotification-span">
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
          {currentUser && (
            <ul className="sidebar-menu-items" onClick={showSidebar}>
              <li className="sidebar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose className="close" />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="sidebar-span">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </IconContext.Provider>
    </>
  );
}
