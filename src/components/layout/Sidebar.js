import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "../css/Sidebar.module.css";
import { SidebarData2 } from "./SidebarData2";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuIcon from "@material-ui/icons/Menu";

function Sidebar() {
  const [open, openMenu] = useState(false);
  const toggle = () => openMenu(!open);

  return (
    <div style={{ width: open ? "154px" : "48px" }} className={classes.sidebar}>
      <div className={classes.menu} onClick={toggle}>
        <MenuIcon />
      </div>

      <div className={classes.user}>
        <div id={classes.icon}>
          <AccountBoxIcon style={{ fontSize: open ? "40px" : "26px" }} />
        </div>
        <div style={{ display: open ? "block" : "none" }} id={classes.name}>
          Username 1234
        </div>
      </div>

      {SidebarData2.map((val) => {
        return (
          <>
            <Link to={val.link} className={classes.row}>
              <div id={classes.icon}>{val.icon}</div>
              <div
                style={{ display: open ? "block" : "none" }}
                id={classes.title}
              >
                {val.title}
              </div>
            </Link>
            {val.childrens &&
              val.childrens.map((child) => (
                <Link to={child.link} className={classes.row}>
                  <div id={classes.icon}>{child.icon}</div>
                  <div
                    style={{ display: open ? "block" : "none" }}
                    id={classes.title}
                  >
                    {child.title}
                  </div>
                </Link>
              ))}
          </>
        );
      })}
    </div>
  );
}

export default Sidebar;
