import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

function Sidebar({ modal, setModal }) {
  const toggleModal = () => {
    if (modal == 0) {
      setModal(1);
    } else {
      setModal(0);
    }
  };
  return (
    <div className="sidebar">
      {/*SidenbarOption */}
      <SidebarOption Icon={HomeIcon} text="Home" active="true" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifictions" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/*SidenbarOption */}

      {/*Button -> tweet */}
      <div className="sidebar_BtnContainer">
        <Button
          className="sidebar__tweet"
          onClick={() => toggleModal()}
          variant="outlined"
          fullWidth
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
