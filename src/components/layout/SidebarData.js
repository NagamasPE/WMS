import { useState } from "react";
import classes from "../css/Sidebar.module.css";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FaceIcon from "@material-ui/icons/Face";
import CategoryIcon from "@material-ui/icons/Category";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StorageIcon from "@material-ui/icons/Storage";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SendIcon from "@material-ui/icons/Send";
import WorkIcon from "@material-ui/icons/Work";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon style={{ fontSize: "1.75vw" }} />,
    link: "/main",
  },
  {
    title: "Master",
    icon: <StorageIcon style={{ fontSize: "1.75vw" }} />,
    arrow: <KeyboardArrowDownIcon style={{ fontSize: "1.75vw" }} />,
    link: "#",
    childrens: [
      {
        title: "Operator",
        icon: <AssignmentIndIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/operator",
      },
      {
        title: "Product",
        icon: <GolfCourseIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/produk",
      },
      {
        title: "Material",
        icon: <LocalGroceryStoreIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/material",
      },
      {
        title: "Recipe",
        icon: <DonutSmallIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/recipe",
      },
      {
        title: "Group",
        icon: <CategoryIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/grup",
      },
    ],
  },
  {
    title: "Transaction",
    icon: <ImportExportIcon style={{ fontSize: "1.75vw" }} />,
    arrow: <KeyboardArrowDownIcon style={{ fontSize: "1.75vw" }} />,
    link: "#",
    childrens: [
      {
        title: "Planning",
        icon: <TrackChangesIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/planning",
      },
      {
        title: "Incoming Material",
        icon: <AddShoppingCart style={{ fontSize: "1.75vw" }} />,
        link: "/master/material_masuk",
      },
      {
        title: "Weighing",
        icon: <EqualizerIcon style={{ fontSize: "1.75vw" }} />,
        link: "/master/penimbangan_to",
      },
    ],
  },
  {
    title: "Production",
    icon: <WorkIcon style={{ fontSize: "1.75vw" }} />,
    link: "/production",
  },
  {
    title: "Delivery",
    icon: <SendIcon style={{ fontSize: "1.75vw" }} />,
    link: "/delivery",
  },
];
