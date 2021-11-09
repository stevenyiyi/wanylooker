import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import browserCookies from "browser-cookies";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MobileDetect from "mobile-detect";
import MainPage from "./MainPage";
import HelperContent from "./helps/HelperContent";
import CameraList from "./player/CameraList";
import Backend from "./backend/Backend";
import Readme from "./readme";
import ChangePwd from "./ChangePwd";
import { RegisterOrLogin, LoginAction, LoginState } from "./RegisterOrLogin";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  content: {
    width: "100%",
    paddingTop: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function TabsWrappedLabel(props) {
  const { mobile, iphone, username } = props;
  const classes = useStyles();
  const thisTheme = useTheme();
  const [value, setValue] = React.useState(0);
  const [menuState, setMenuState] = React.useState({
    openLogin: false,
    openChangePwd: false,
    username: username,
    action: LoginAction.Login
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const onLogin = () => {
    setMenuState({
      ...menuState,
      openLogin: true,
      action: LoginAction.Login
    });
  };

  const onLoginClose = state => {
    if (state === LoginState.LoginFail) {
      setMenuState({ ...menuState, username: "", openLogin: false });
    } else {
      setMenuState({ ...menuState, openLogin: false });
    }
  };
  const onLoginSucess = username => {
    console.log("login success!");
    setMenuState({
      ...menuState,
      openLogin: false,
      username: username
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    console.log("handleChangeIndex index:" + index);
    setValue(index);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    onLogin();
    setAnchorEl(null);
  };
  const handleLogout = () => {
    browserCookies.erase("playerid");
    browserCookies.erase("username");
    browserCookies.erase("token");
    browserCookies.erase("role");
    setAnchorEl(null);
  };
  const handleRegister = () => {
    setMenuState({
      ...menuState,
      openLogin: true,
      action: LoginAction.Register
    });
    setAnchorEl(null);
  };
  const handleChangePwd = () => {
    setMenuState({ ...menuState, openChangePwd: true });
    setAnchorEl(null);
  };

  const handleChangePwdClose = () => {
    setMenuState({ ...menuState, openChangePwd: false });
  };

  const generateMenus = () => {
    if (menuState.username)
      return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogin}>切换帐户</MenuItem>
          <MenuItem onClick={handleChangePwd}>修改口令</MenuItem>
          <MenuItem onClick={handleLogout}>注销</MenuItem>
        </Menu>
      );
    else
      return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleRegister}>注 册</MenuItem>
          <MenuItem onClick={handleLogin}>登 录</MenuItem>
        </Menu>
      );
  };

  return (
    <div className={classes.root}>
      <RegisterOrLogin
        open={menuState.openLogin}
        username={menuState.username}
        action={menuState.action}
        onClose={onLoginClose}
        onLoginSucess={onLoginSucess}
      />
      <ChangePwd
        username={menuState.username}
        open={menuState.openChangePwd}
        onClose={handleChangePwdClose}
      />
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            nebula 流媒体直播云
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {generateMenus()}
        </Toolbar>
      </AppBar>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="wrapped label tabs example"
        >
          <Tab label="产品介绍" {...a11yProps(0)} />
          <Tab label="演示点" {...a11yProps(1)} />
          <Tab label="接入设备" {...a11yProps(2)} />
          <Tab label="文档" {...a11yProps(3)} />
          <Tab label="下载" {...a11yProps(4)} />
          <Tab label="联系我们" {...a11yProps(5)} />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={thisTheme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel className={classes.content} value={value} index={0}>
          <MainPage />
        </TabPanel>
        <TabPanel className={classes.content} value={value} index={1}>
          <CameraList url="/sapling/get_demo_list" mobile={mobile} />
        </TabPanel>
        <TabPanel className={classes.content} value={value} index={2}>
          <Backend username={menuState.username} onLogin={onLogin} />
        </TabPanel>
        <TabPanel className={classes.content} value={value} index={3}>
          <HelperContent />
        </TabPanel>
        <TabPanel className={classes.content} value={value} index={4} />
        <TabPanel className={classes.content} value={value} index={5}>
          <Readme />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

(() => {
  let md = new MobileDetect(window.navigator.userAgent);
  let isMobile = md.mobile() ? true : false;
  let isIPhone = md.is("iPhone") && md.userAgent() === "Safari";
  let uid = browserCookies.get("username");
  if (uid == null) {
    uid = "";
  }
  ReactDOM.render(
    <TabsWrappedLabel mobile={isMobile} iphone={isIPhone} username={uid} />,
    document.querySelector("#root")
  );
})();
