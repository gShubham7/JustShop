import { Fragment, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse } from "@mui/material";
import { MenuEnum } from "../models/enum/MenuEnum";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ListIcon from "@mui/icons-material/List";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CategoryIcon from "@mui/icons-material/Category";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const closedDrawerWidth = 65;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.grey[800],
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.common.black,
  width: `calc(100% - ${closedDrawerWidth}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuList = [
  {
    text: MenuEnum.Dashboard,
    icon: <DashboardCustomizeIcon />,
    linkTo: "/admin",
  },
  {
    text: MenuEnum.Customers,
    icon: <PeopleAltIcon />,
    linkTo: "customers",
  },
  {
    text: MenuEnum.Catalog,
    icon: <ShoppingCartIcon />,
    children: [
      {
        text: MenuEnum.AddProduct,
        icon: <AddShoppingCartIcon />,
        linkTo: "add-product",
      },
      {
        text: MenuEnum.ProductList,
        icon: <ListIcon />,
        linkTo: "list-product",
      },
      {
        text: MenuEnum.Brand,
        icon: <BrandingWatermarkIcon />,
        linkTo: "brand",
      },
      { text: MenuEnum.BrandList, icon: <ListIcon />, linkTo: "list-brand" },
      { text: MenuEnum.Category, icon: <CategoryIcon />, linkTo: "category" },
      {
        text: MenuEnum.CategoryList,
        icon: <ListIcon />,
        linkTo: "list-category",
      },
    ],
  },
  {
    text: MenuEnum.Orders,
    icon: <ChecklistIcon />,
    linkTo: "orders",
  },
];

type ActiveMenuProps = {
  [key: string]: boolean;
};

const ActiveMenu: ActiveMenuProps = {
  [MenuEnum.Dashboard]: false,
  [MenuEnum.Customers]: false,
  [MenuEnum.Catalog]: false,
  [MenuEnum.Orders]: false,
};

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openList, setOpenList] = useState<ActiveMenuProps>(ActiveMenu);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCollapse = (name: MenuEnum) => {
    setOpenList({ ...openList, [name]: !openList[name] });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: theme.palette.warning.light }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" width="100%" textAlign="left" px={2}>
            {open ? "Menu" : "S.G."}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {open && (
              <ChevronLeftIcon sx={{ color: theme.palette.common.white }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuList.map((item) => (
            <Fragment key={item.text}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={
                    item.children
                      ? () => handleCollapse(item.text)
                      : () => navigate(item.linkTo)
                  }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: theme.palette.common.white,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {item.children && open && !openList[item.text] && (
                    <ExpandMoreIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  )}
                  {item.children && open && openList[item.text] && (
                    <ExpandLessIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openList[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children?.map((child, key) => (
                    <ListItemButton
                      key={key}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(child.linkTo)}
                    >
                      <ListItemIcon sx={{ color: theme.palette.common.white }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          p: 3,
          bgcolor: theme.palette.grey[200],
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
