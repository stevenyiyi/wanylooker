import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Introduce from "./Introduce";
import DeviceRegister from "./DeviceRegister";
import UserRegister from "./UserRegister";
import MySubUsers from "./MySubUsers";
import DeviceList from "./DeviceManager.js";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    width: "20%",
    borderRight: `1px solid ${theme.palette.divider}`
  },
  views: {
    width: "80%"
  }
}));

function FullWidthTabs(props) {
  const { username, onLogin } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [updateDevice, setUpdateDevice] = React.useState(0);
  const [updateUser, setUpdateUser] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("handleChange value:" + newValue);
    if (!username) {
      onLogin();
    }
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    console.log("handleChangeIndex index:" + index);
    if (!username) {
      onLogin();
    }
    setValue(index);
  };

  const handleDeviceUpdate = () => {
    setUpdateDevice(updateDevice => updateDevice + 1);
  };

  const handleUserUpdate = () => {
    setUpdateUser(updateUser => updateUser + 1);
  };

  React.useEffect(() => {
    console.log("username changed:" + username);
    if (username) {
      setUpdateDevice(updateDevice => updateDevice + 1);
    }
  }, [username]);

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="anysee backend tabs"
      >
        <Tab label="介绍" {...a11yProps(0)} />
        <Tab label="设备注册" {...a11yProps(1)} />
        <Tab label="我的设备" {...a11yProps(2)} />
        <Tab label="子用户注册" {...a11yProps(3)} />
        <Tab label="我的子用户" {...a11yProps(4)} />
      </Tabs>
      <SwipeableViews
        className={classes.views}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Introduce />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <DeviceRegister onUpdate={handleDeviceUpdate} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <DeviceList username={username} update={updateDevice} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <UserRegister
            loginid={username}
            update={updateDevice}
            onUpdate={handleUserUpdate}
          />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <MySubUsers
            username={username}
            updateUser={updateUser}
            updateDevice={updateDevice}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default function Backend(props) {
  const { username, onLogin } = props;
  return (
    <Paper>
      <FullWidthTabs username={username} onLogin={onLogin} />
    </Paper>
  );
}
