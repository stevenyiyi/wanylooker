import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MyDeviceList from "./MyDeviceList";
import MyCameraList from "./MyCameraList";
import AsyncFetch from "../utils/AsyncFetch";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0)
  },
  div_control: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function UserRegister(props) {
  const { loginid, update, onUpdate } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("88888888");
  const nowDate = new Date(Date.now() + 180 * 24 * 3600000).Format(
    "yyyy-MM-dd"
  );

  const [endts, setEndts] = React.useState(nowDate);
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedDevices, setSelectedDevices] = React.useState([]);
  const [selectedCameras, setSelectedCameras] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const butEl = React.useRef(null);
  function showPopper(msg) {
    if (anchorEl) {
      return;
    }
    setMessage(msg);
    let ael = butEl.current;
    setAnchorEl(ael);
    var tid = window.setTimeout(() => {
      setAnchorEl(null);
      window.clearTimeout(tid);
    }, 6000);
  }
  const handleChange = (name) => (event) => {
    let v = event.target.value.trim();
    if (name === "username") {
      setUsername(v);
    } else if (name === "password") {
      setPassword(v);
    } else if (name === "name") {
      setName(v);
    }
  };
  const handleDateChange = (event) => {
    console.log(event.target.value);
    setEndts(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDeviceChange = (selDevices) => {
    setSelectedDevices(selDevices);
  };
  const handleCameraChange = (selCameras) => {
    setSelectedCameras(selCameras);
  };
  const handleRegister = (event) => {
    const regUid = /^[0-9a-zA-Z]*$/;
    if (!username || !regUid.test(username) || username.length < 6) {
      showPopper(
        "??????????????????????????????????????????&&??????????????????????????????&&????????????6."
      );
      return;
    }
    if (!name) {
      showPopper("??????????????????!");
      return;
    }
    if (!password) {
      showPopper("?????????????????????");
      return;
    }
    if (!selectedCameras) {
      showPopper("???????????????????????????????????????");
      return;
    }
    let qparams = {
      username: username,
      name: name,
      password: password,
      end_ts: endts,
      cameras: selectedCameras.map((cam) => cam.deviceid)
    };
    AsyncFetch("/sapling/register_subuser", qparams, "POST")
      .then((response) => {
        let result = response.result;
        if (result !== 0) {
          showPopper("?????????????????????,?????????????????????!");
          return;
        }
        setUsername("");
        setName("");
        onUpdate();
      })
      .catch((error) => {
        showPopper(error);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "register-user-popper" : undefined;
  return (
    <Paper>
      <form className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="register-username">??????????????????</InputLabel>
          <Input
            id="register-username"
            type="text"
            value={username}
            onChange={handleChange("username")}
          />
          <FormHelperText id="register-username-helper-text">
            ?????????(??????/email/??????)
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="register-password">???????????????</InputLabel>
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="register-password-helper-text">
            ?????????(??????8???8)
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="register-username">???????????????</InputLabel>
          <Input
            id="register-nickname"
            type="text"
            value={name}
            onChange={handleChange("name")}
          />
          <FormHelperText id="register-name-helper-text">
            ?????????(???????????????)
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Input
            id="register-end-ts"
            type="date"
            value={endts}
            onChange={handleDateChange}
          />
          <FormHelperText id="register-helper-date">
            ??????????????????
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parent-device-select">?????????????????????</InputLabel>
          <MyDeviceList
            username={loginid}
            devices={selectedDevices}
            onSelectedChange={handleDeviceChange}
            update={update}
          />
          <FormHelperText id="parent-device-helper-text">?????????</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parent-device-select">?????????????????????</InputLabel>
          <MyCameraList
            username={loginid}
            parentids={selectedDevices}
            cameras={selectedCameras}
            onSelectedChange={handleCameraChange}
          />
          <FormHelperText id="rel-device-helper-text">?????????</FormHelperText>
        </FormControl>
      </form>
      <div className={classes.div_control}>
        <Button
          variant="outlined"
          aria-describedby={id}
          ref={butEl}
          color="primary"
          className={classes.button}
          onClick={handleRegister}
        >
          ??????
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} disablePortal={true}>
          <Paper>
            <Typography className={classes.typography}>{message}</Typography>
          </Paper>
        </Popper>
      </div>
    </Paper>
  );
}
