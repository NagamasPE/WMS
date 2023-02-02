import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "../css/Sidebar.module.css";
import { SidebarData2 } from "./SidebarData2";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";

function Sidebar(props) {
  var setShowlogin = props.setShowlogin;
  const [open, openMenu] = useState(false);
  const toggleSide = () => {
    openMenu(!open);
  };
  const [dropdowns, setDropdowns] = useState(
    SidebarData2.map((val, index) => ({ drop: false, index }))
  );
  const toggleDrop = (index) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index].drop = !newDropdowns[index].drop;
    setDropdowns(newDropdowns);
  };

  function clickLogin(event) {
    setShowlogin(true);
  }

  function closeMenu() {
    if (props.close) {
      openMenu(false);
    }
  }
  closeMenu();

  return (
    <div style={{ width: open ? "200px" : "48px" }} className={classes.sidebar}>
      <div className={classes.menu} onClick={toggleSide}>
        <MenuIcon />
      </div>

      <div className={classes.user}>
        <div id={classes.pict}>
          <AccountBoxIcon style={{ fontSize: open ? "40px" : "26px" }} />
        </div>
        <div style={{ display: open ? "block" : "none" }} id={classes.name}>
          Username 1234
        </div>
        <div style={{ display: open ? "flex" : "none" }} onClick={clickLogin}>
          <ExitToAppIcon />
        </div>
      </div>

      {SidebarData2.map((val, index) => {
        //console.log(`Key for ${val.title} is ${val.title}`);
        return (
          <>
            <Link
              key={val.title}
              to={val.link}
              className={classes.row}
              style={{ display: open ? "grid" : "flex" }}
            >
              <div id={classes.icon}>{val.icon}</div>
              <div
                style={{ display: open ? "flex" : "none" }}
                id={classes.title}
              >
                {val.title}
              </div>
              <div
                style={{
                  display: open ? "grid" : "none",
                  transform: dropdowns[index].drop
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
                id={classes.arrow}
                onClick={() => toggleDrop(index)}
              >
                {val.arrow}
              </div>
            </Link>

            {val.childrens &&
              val.childrens.map((child, subIndex) => {
                {
                  /*console.log(
                  `Key for ${child.title} is ${val.title}-${subIndex}`
                );*/
                }
                return (
                  <Link
                    key={`${child.title}-${subIndex}`}
                    to={child.link}
                    className={classes.subRow}
                    style={{
                      paddingLeft: open ? "20px" : "0",
                      display: dropdowns[index].drop ? "flex" : "none",
                    }}
                  >
                    <div id={classes.icon}>{child.icon}</div>
                    <div
                      style={{ display: open ? "block" : "none" }}
                      id={classes.title}
                    >
                      {child.title}
                    </div>
                  </Link>
                );
              })}
          </>
        );
      })}
    </div>
  );
}

export default Sidebar;
