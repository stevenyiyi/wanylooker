import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import sha1 from "js-sha1";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import AsyncFetch from "./utils/AsyncFetch";

const LoginAction = {
  Login: 0,
  Register: 1
};

const LoginState = {
  UnLogin: 0,
  LoginFail: 1,
  LoginSuccess: 2
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 20
  },
  typography: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function RegisterOrLogin(props) {
  const ERR_NO_ACCOUNT = 0x800000f;
  const ERR_INVALID_PWD = ERR_NO_ACCOUNT + 1;
  const ERR_OVERDUE = ERR_INVALID_PWD + 1;

  const { open, username, action, onClose, onLoginSucess } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    username: !username ? "" : username,
    password: "",
    showPassword: false,
    message: ""
  });
  const [state, setState] = React.useState(LoginState.UnLogin);
  const butEl = React.useRef(null);
  function showPopper(msg) {
    if (anchorEl) {
      return;
    }
    setValues({ ...values, message: msg });
    let ael = butEl.current;
    setAnchorEl(ael);
    var tid = window.setTimeout(() => {
      setAnchorEl(null);
      window.clearTimeout(tid);
    }, 6000);
  }
  const handleChange = (name) => (event) => {
    let ev = event.target.value.trim();
    setValues({
      ...values,
      [name]: ev
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleAction = () => {
    const regUid =
      action === LoginAction.Register
        ? /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
        : /^[0-9a-zA-Z]*$/;
    if (!values.username || !regUid.test(values.username)) {
      showPopper("请输入正确用户名格式!");
      return;
    }
    if (!values.password) {
      showPopper("口令不能为空！");
      return;
    }
    if (action === LoginAction.Register) {
      register();
    } else {
      login();
    }
  };
  const handleClose = () => {
    onClose(state);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function register() {
    let qparams = {
      username: values.username,
      password: values.password
    };
    AsyncFetch("/sapling/register_user", qparams, "POST")
      .then((response) => {
        let result = response.result;
        if (result !== 0) {
          showPopper("注册错误!");
          return;
        }
        login();
      })
      .catch((error) => {
        showPopper(error.name + error.message);
      });
  }

  function login() {
    let qparams = { ts: Date.now() };
    if (open) {
      let path = "/sapling/login";
      let h1 = sha1(values.username + ":" + values.password);
      let h2 = sha1(values.password + ":" + path);
      let h3 = sha1(values.username + ":" + values.password + ":" + path);
      qparams.username = values.username;
      qparams.token = sha1(h1 + ":" + h2 + ":" + h3);
    }
    AsyncFetch("/sapling/login", qparams)
      .then((response) => {
        let result = response.result;
        if (result === 0) {
          setState(LoginState.LoginSuccess);
          onLoginSucess(values.username);
        } else {
          if (result === ERR_INVALID_PWD) {
            setState(LoginState.LoginFail);
            showPopper("口令错误!");
          } else if (result === ERR_OVERDUE) {
            showPopper("帐户已过期!");
          } else {
            setState(LoginState.LoginFail);
            showPopper("未知错误!");
          }
        }
      })
      .catch((error) => {
        showPopper(error.name + error.message);
      });
  }

  const popen = Boolean(anchorEl);
  const id = props.open ? "register-user-popper" : undefined;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="guest-register-dialog-title"
      open={open}
    >
      <DialogTitle id="guest-register-dialog-title" onClose={handleClose}>
        {action === LoginAction.Register ? "注册" : "登录"}
      </DialogTitle>
      <DialogContent dividers>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="register-username">请输入用户名</InputLabel>
          <Input
            id="register-username"
            type="text"
            value={values.username}
            onChange={handleChange("username")}
          />
          <FormHelperText id="register-username-helper-text">
            必填项(手机号码)
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="register-password">请输入口令</InputLabel>
          <Input
            id="register-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="register-password-helper-text">
            必填项
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          aria-describedby={id}
          ref={butEl}
          className={classes.button}
          onClick={handleAction}
          color="primary"
        >
          确 认
        </Button>
        <Popper id={id} open={popen} anchorEl={anchorEl} disablePortal={true}>
          <Paper>
            <Typography className={classes.typography}>
              {values.message}
            </Typography>
          </Paper>
        </Popper>
      </DialogActions>
    </Dialog>
  );
}

RegisterOrLogin.propTypes = {
  open: PropTypes.bool,
  username: PropTypes.string,
  action: PropTypes.number,
  onClose: PropTypes.func,
  onLoginSuccess: PropTypes.func
};
RegisterOrLogin.defaultProps = {
  open: true,
  username: "",
  action: LoginAction.Login,
  onClose: (state) => {},
  onLoginSuccess: (username) => {}
};
export { RegisterOrLogin, LoginAction, LoginState };
