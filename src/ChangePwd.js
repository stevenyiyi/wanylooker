import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import aesjs from "aes-js";
import md5 from "MD5";
import browserCookies from "browser-cookies";
import AsyncFetch from "./utils/AsyncFetch";
import { calcToken } from "./utils/utils";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(2)
  }
}));

export default function ChangePwd(props) {
  const { username, open, onClose } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    old_password: "",
    new_password: "",
    re_new_password: "",
    message: ""
  });
  const butEl = React.useRef(null);
  /** From  cookies invalidate old password */
  function validateOldPwd(oldpwd) {
    let isok = false;
    let token = browserCookies.get("token");
    let username = browserCookies.get("username");
    let path = "/sapling/login";
    let ctoken = calcToken(username, oldpwd, path);
    if (ctoken !== token) {
      path = "/sapling/get_camera_list";
      ctoken = calcToken(username, oldpwd, path);
      isok = ctoken === token ? true : false;
    } else {
      isok = true;
    }
    return isok;
  }
  function changePassword(oldpwd, newpwd) {
    let skey = md5(username + ":" + oldpwd);
    let bkey = aesjs.utils.hex.toBytes(skey);
    var t = Date.now();
    var aesEcb = new aesjs.ModeOfOperation.ctr(bkey, new aesjs.Counter(t));
    var textBytes = aesjs.utils.utf8.toBytes(newpwd);
    var encryptedBytes = aesEcb.encrypt(textBytes);
    var epwd = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log("encrypt password:" + epwd);
    let qparams = { newpwd: epwd, counter: t };
    AsyncFetch("/sapling/change_password", qparams)
      .then(response => {
        const ERR_NO_ACCOUNT = 0x800000f;
        const ERR_PWD = 0x8000010;
        const ERR_ACCESS_DEINED = 0x8000014;
        let ret = response.result;
        if (ret === 0) {
          showPopper("口令修改成功!");
        } else if (ret === ERR_NO_ACCOUNT) {
          showPopper("用户名不存在!");
        } else if (ret === ERR_PWD) {
          showPopper("原口令错误!");
        } else if (ret === ERR_ACCESS_DEINED) {
          showPopper("此帐户无权修改!");
        } else {
          showPopper("未知错误!");
        }
      })
      .catch(error => {
        showPopper("网络出了点问题，请稍候再试!");
      });
  }
  function showPopper(msg) {
    if (anchorEl) {
      return;
    }
    setValues({ ...values, message: msg });
    let ael = butEl.current;
    setAnchorEl(ael);
    var tid = window.setTimeout(() => {
      setAnchorEl(null);
      clearTimeout(tid);
    }, 6000);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value.trim() });
  };

  const handleSubmit = event => {
    console.log("username:" + values.username);
    if (
      !values.old_password ||
      !values.new_password ||
      !values.re_new_password
    ) {
      showPopper("新老口令或重复新口令不能为空!");
    } else if (values.new_password !== values.re_new_password) {
      showPopper("新口令与重复新口令不一致!");
    } else if (!validateOldPwd(values.old_password)) {
      showPopper("老口令错误!");
    } else {
      changePassword(values.old_password, values.new_password);
    }
    event.preventDefault();
  };

  function handleClose() {
    onClose();
  }

  const openAnchorEl = Boolean(anchorEl);
  const id = openAnchorEl ? "change-pwd-popper" : undefined;

  console.log("render ChangePassword, open:%o", values);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">用户名:{username}</DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="请输入老口令"
            type="password"
            id="change-pwd-old-password"
            autoComplete="current-password"
            value={values.old_password}
            onChange={handleChange("old_password")}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="请输入新口令"
            type="password"
            id="change-pwd-new-password"
            autoComplete="current-password"
            value={values.new_password}
            onChange={handleChange("new_password")}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="请再次输入新口令"
            type="password"
            id="change-pwd-renew-password"
            autoComplete="current-password"
            value={values.re_new_password}
            onChange={handleChange("re_new_password")}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleClose}
        >
          退 出
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
          aria-describedby={id}
          ref={butEl}
          onClick={handleSubmit}
        >
          确 认
        </Button>
        <Popper
          id={id}
          open={openAnchorEl}
          anchorEl={anchorEl}
          disablePortal={true}
        >
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
ChangePwd.propTypes = {
  username: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

ChangePwd.defaultProps = {
  username: "",
  open: true,
  onClose: () => {}
};
