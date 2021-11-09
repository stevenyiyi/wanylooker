import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";
import Server from "@material-ui/icons/Storage";
import Camcorder from "@material-ui/icons/Videocam";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import AsyncFetch from "../utils/AsyncFetch";
import { ITEM_HEIGHT } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "sm",
    backgroundColor: theme.palette.background.paper
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: green[500]
  },
  inline: {
    display: "inline"
  }
}));

/** 设备注册信息dialog */
function RegisterInfoDialog(props) {
  const { onClose, open, device } = props;
  const handleClose = () => {
    onClose();
  };

  function genChannelInfo() {
    let dtype = device.deviceid.substr(10, 3);
    if (dtype === "111") {
      let ccode = device.deviceid.substr(0, 10) + "132";
      let sn = device.deviceid.substr(15);
      let channelNos = ccode + sn + "01--XX";
      return (
        <ListItem>
          <ListItemText primary="通道编码范围" secondary={channelNos} />
        </ListItem>
      );
    } else {
      return null;
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="register-info-dialog-title"
      open={open}
    >
      <DialogTitle id="register-info-dialog-title">设备注册信息</DialogTitle>
      {device && (
        <Container maxWidth="sm">
          <List dense>
            <ListItem>
              <ListItemText primary="设备编号" secondary={device.deviceid} />
            </ListItem>
            <ListItem>
              <ListItemText primary="注册密码" secondary={device.password} />
            </ListItem>
            {genChannelInfo()}
            <ListItem>
              <ListItemText
                primary="SIP服务器编号"
                secondary={device.server_code}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="SIP服务器IP"
                secondary={device.server_ip}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="SIP服务器端口"
                secondary={device.server_port}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="SIP域" secondary={device.domain} />
            </ListItem>
          </List>
        </Container>
      )}
    </Dialog>
  );
}

RegisterInfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  device: PropTypes.object
};

function EditChannelDlg(props) {
  const { open, cam, onClose, onChangeName } = props;
  const [name, setName] = React.useState("");
  const handleChange = (event) => {
    let ev = event.target.value.trim();
    setName(ev);
  };
  const handleOK = () => {
    onChangeName(cam.deviceid, name);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="change-name-dialog">
      <DialogTitle id="change-name-dialog">修改通道</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`通道ID:${cam && cam.deviceid} 通道名称:${cam && cam.name}`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="新通道名称"
          type="text"
          value={name}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          终止
        </Button>
        <Button onClick={handleOK} color="primary">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function NvrChannelsList(props) {
  const { open, deviceid, onClose, ...other } = props;
  const [cameras, setCameras] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editCamera, setEditCamera] = React.useState(null);
  const refChangeCams = React.useRef(null);
  React.useEffect(() => {
    AsyncFetch("/sapling/get_device", [deviceid], "POST")
      .then((response) => {
        if (response.result === 0) {
          setCameras(response.devices);
        }
      })
      .catch((error) => {
        console.log(`get_device error:${error.message}`);
      });
  }, [deviceid]);

  const genChannelInfoFromOid = (oid) => {
    let c = oid.substring(18);
    return `通道:${parseInt(c, 10)} ID:${oid}`;
  };

  const handleEditName = (cam) => {
    setEditCamera(cam);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    // Update change camera names into server
    if (refChangeCams.current) {
      let cams = [];
      for (let [key, value] of refChangeCams.current) {
        let item = { deviceid: key, name: value };
        cams.push(item);
      }
      AsyncFetch("/sapling/modify_channels", cams, "POST")
        .then((response) => {
          if (response.result !== 0) {
            console(`Error for modify_channels:${response.result}`);
          }
        })
        .catch((error) => {
          console.log(`Error for modify_channels:${error.message}`);
        });
    }
    onClose();
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditChange = (deviceid, name) => {
    if (!refChangeCams.current) {
      refChangeCams.current = new Map();
    }
    refChangeCams.current.set(deviceid, name);
    cameras.forEach((cam) => {
      if (cam.deviceid === deviceid) {
        cam.name = name;
      }
    });
  };

  const genCameraList = (cams) => {
    return (
      <List dense="true">
        {cameras &&
          cameras.map((cam) => {
            return (
              <ListItem key={cam.deviceid} button>
                <ListItemAvatar>
                  <Avatar>
                    <Camcorder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={cam.deviceid}
                  primary={`名称：${cam.name}`}
                  secondary={genChannelInfoFromOid(cam.deviceid)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) => {
                      handleEditName(cam);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    );
  };
  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">NVR通道修改</DialogTitle>
        <DialogContent dividers> {genCameraList()} </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={handleOk} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
      <EditChannelDlg
        open={openEdit}
        cam={editCamera}
        onClose={handleEditClose}
        onChangeName={handleEditChange}
      />
    </>
  );
}

export default function DeviceList(props) {
  const classes = useStyles();
  const { username, update } = props;
  const [openRegInfo, setOpenRegInfo] = React.useState(false);
  const [openChannels, setOpenChannels] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState(null);
  const [devices, setDevices] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleRegInfoClose = () => {
    setOpenRegInfo(false);
  };

  const handleChannelsClose = () => {
    setOpenChannels(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenusClick = (event, value) => {
    setSelectedDevice(value);
    setAnchorEl(event.currentTarget);
  };

  const handleRegisterInfoClick = (event) => {
    setOpenRegInfo(!openRegInfo);
    setAnchorEl(null);
  };

  const handleEditChannelsClick = (event) => {
    setOpenChannels(!openChannels);
    setAnchorEl(null);
  };

  const genDevMenu = () => {
    return (
      <Menu
        id="nebula-dev-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        <MenuItem onClick={handleRegisterInfoClick}>注册信息</MenuItem>
        <MenuItem onClick={handleEditChannelsClick}>通道名称修改</MenuItem>
      </Menu>
    );
  };

  function genAvatar(deviceid) {
    let dtype = deviceid.substr(10, 3);
    return (
      <ListItemAvatar>
        <Avatar className={classes.greenAvatar}>
          {dtype === "111" ? <Server /> : <Camcorder />}
        </Avatar>
      </ListItemAvatar>
    );
  }

  function genDeviceList() {
    console.log("genDeviceList");
    return devices.map((dev) => (
      <>
        <ListItem alignItems="flex-start">
          {genAvatar(dev.deviceid)}
          <ListItemText primary={dev.name} secondary={dev.deviceid} />
          <ListItemSecondaryAction>
            <IconButton
              onClick={(event) => {
                handleMenusClick(event, dev);
              }}
              edge="end"
              aria-label="menu"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            {genDevMenu()}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ));
  }

  React.useEffect(() => {
    if (username) {
      AsyncFetch("/sapling/get_device")
        .then((response) => {
          let result = response.result;
          if (result !== 0) {
            console.log("result:" + result);
            return;
          }
          setDevices(response.devices);
        })
        .catch((error) => {
          console.log(error.name + error.message);
        });
    } else {
      setDevices([]);
    }
  }, [update, username]);

  return (
    <Paper className={classes.root}>
      <List className={classes.root}>{genDeviceList()}</List>
      <RegisterInfoDialog
        onClose={handleRegInfoClose}
        open={openRegInfo}
        device={selectedDevice}
      />
      <NvrChannelsList
        open={openChannels}
        deviceid={selectedDevice ? selectedDevice.deviceid : null}
        onClose={handleChannelsClose}
      />
    </Paper>
  );
}
