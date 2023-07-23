import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");
    // Redirect user to home page
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PioneerPolls
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem key={"dashboard"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"user"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/account/:id");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={props.user.studentID} />
            </ListItemButton>
          </ListItem>
          <Divider>Search</Divider>
          <ListItem key={"polls"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/search/polls");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Polls"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"ratings"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/search/ratings");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Ratings"} />
            </ListItemButton>
          </ListItem>
          <Divider>New</Divider>
          <ListItem key={"poll"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/new/poll");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Poll"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"rating"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/new/rating");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Rating"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"settings"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/settings");
                handleDrawerClose();
              }}
            >
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"logout"} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
