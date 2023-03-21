import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "../css/Sidebar.module.css";
import { SidebarData } from "./SidebarData";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function Sidebar(props) {
  var loginusername = props.loginusername;
  var setShowlogin = props.setShowlogin;
  const open = props.open;
  const openMenu = props.openMenu;

  const toggleSide = () => {
    openMenu(!open);
  };

  const [dropdowns, setDropdowns] = useState(
    SidebarData.map((val, index) => ({ drop: false, index }))
  );
  const toggleDrop = (index) => {
    const newDropdowns = [...dropdowns];
    if (newDropdowns[index].drop === true) {
      newDropdowns[index].drop = false;
    } else {
      newDropdowns.map((dropdown) => {
        dropdown.drop = false;
      });
      newDropdowns[index].drop = true;
    }

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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width:
          screenWidth <= 1080
            ? open
              ? "100%"
              : "100%"
            : open
            ? "14vw"
            : "3vw",
        height:
          screenWidth <= 1080
            ? open
              ? dropdowns[1].drop || dropdowns[2].drop
                ? "21.5vh"
                : "17vh"
              : "4vh"
            : open
            ? "100vh"
            : "100vh",
      }}
      className={classes.sidebar}
    >
      <div
        className={classes.menu}
        onClick={toggleSide}
        style={{
          paddingLeft: screenWidth <= 1080 ? "47.5vw" : open ? "85%" : "25%",
          transition: "1s",
        }}
      >
        <KeyboardArrowDownIcon
          style={{
            fontSize: "3vh",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: screenWidth <= 1080 ? "block" : "none",
            transition: "0.5s",
          }}
        />
        <KeyboardArrowRightIcon
          style={{
            fontSize: "1.75vw",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: screenWidth <= 1080 ? "none" : "block",
            transition: "0.5s",
          }}
        />
      </div>

      <div
        className={classes.user}
        style={{
          display: screenWidth <= 1080 ? (open ? "flex" : "none") : "flex",
          margin: "0 0 1vh 0",
        }}
      >
        <div id={classes.pict}>
          <AccountBoxIcon
            style={{
              fontSize: screenWidth <= 1080 ? "3vh" : open ? "3vw" : "2vw",
            }}
          />
        </div>
        <div style={{ display: open ? "block" : "none" }} id={classes.name}>
          <div>{loginusername}</div>
        </div>
        <div style={{ display: open ? "flex" : "none" }} onClick={clickLogin}>
          <ExitToAppIcon
            style={{ fontSize: screenWidth <= 1080 ? "2vh" : "1.5vw" }}
          />
        </div>
      </div>

      <div className={classes.contRow}>
        {SidebarData.map((val, index) => {
          //console.log(`Key for ${val.title} is ${val.title}`);
          const Icon = val.icon;
          // console.log(`Main Menu${index}`);
          return (
            <div key={`Main Menu${index}`}>
              <Link
                to={val.link}
                className={classes.row}
                style={{
                  display:
                    screenWidth <= 1080
                      ? open
                        ? "grid"
                        : "none"
                      : open
                      ? "grid"
                      : "flex",
                }}
              >
                <div id={classes.icon} onClick={() => toggleDrop(index)}>
                  <Icon
                    style={{ fontSize: screenWidth <= 1080 ? "4vh" : "1.75vw" }}
                  />
                  {/* <span className={classes.tooltiptext}>{val.title}</span>  */}
                </div>
                <div
                  style={{ display: open ? "flex" : "none" }}
                  id={classes.title}
                  onClick={() => toggleDrop(index)}
                >
                  {val.title}
                </div>

                {val.arrow && val.link === "#" ? (
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
                ) : null}
              </Link>
              {screenWidth > 1080 &&
                val.childrens &&
                val.childrens.map((child, subIndex) => {
                  {
                    /*console.log(
                  `Key for ${child.title} is ${val.title}-${subIndex}`
                );*/
                  }
                  return (
                    <Link
                      key={`${val.title}-${subIndex}`}
                      to={child.link}
                      className={classes.subRow}
                      style={{
                        paddingLeft: open ? "2.5vw" : "0",
                        display: dropdowns[index].drop ? "flex" : "none",
                      }}
                    >
                      <div id={classes.icon}>
                        {child.icon}
                        <span className={classes.tooltiptext}>
                          {child.title}
                        </span>
                      </div>
                      <div
                        style={{ display: open ? "block" : "none" }}
                        id={classes.title}
                      >
                        {child.title}
                      </div>
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </div>

      {screenWidth <= 1080 &&
        SidebarData.map((val, index) => {
          return (
            <div
              key={index}
              className={classes.contRow}
              style={{
                display: open
                  ? dropdowns[index].drop
                    ? "flex"
                    : "none"
                  : "none",
                flexDirection: "row",
                backgroundColor: "var(--hover-header)",
              }}
            >
              {val.childrens &&
                val.childrens.map((child, subIndex) => {
                  return (
                    <Link
                      key={`${val.title}-${subIndex}`}
                      to={child.link}
                      className={classes.subRow}
                      style={{
                        display: dropdowns[index].drop ? "flex" : "none",
                      }}
                    >
                      <div id={classes.icon}>
                        {child.icon}
                        <span className={classes.tooltiptext}>
                          {child.title}
                        </span>
                      </div>
                      <div
                        style={{ display: open ? "grid" : "none" }}
                        id={classes.title}
                      >
                        {child.title}
                      </div>
                    </Link>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default Sidebar;
