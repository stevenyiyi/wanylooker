import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Data201907 from "./201907.json";
import GBT2260 from "./gbt2260.js";
import AsyncFetch from "../utils/AsyncFetch";
import browserCookies from "browser-cookies";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
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
  },
  link: {
    margin: theme.spacing(1)
  }
}));

export default function DeviceRegister(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    province: "",
    prefecture: "",
    county: "",
    deviceType: "",
    displayName: "",
    username: "",
    password: "",
    children: 1,
    showPassword: false,
    message: ""
  });
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

  const gb2260 = new GBT2260("201907", Data201907);
  const handleChange = name => event => {
    let cval = event.target.value;
    console.log("handleChange=>name:" + name + " value:" + cval);
    if (name === "children") cval = Number(cval);
    setValues({
      ...values,
      [name]: cval
    });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleBlur = name => event => {
    if (name === "children") {
      if (values.children <= 0) {
        setValues({ ...values, [name]: 1 });
      } else if (values.children > 32) {
        setValues({ ...values, [name]: 32 });
      }
    }
  };

  const handleRegister = event => {
    console.log("onclick");
    let uid = browserCookies.get("username");
    if (!uid) {
      showPopper("请先注册您的用户名，才能注册您的设备！");
      return;
    }
    let role = browserCookies.get("role");
    if (Number(role) !== 6) {
      showPopper(
        "您登录的用户权限是观看者（子用户），如要注册设备，请重新注册一个直播帐户，再进行设备注册操作！"
      );
      return;
    }

    if (
      !values.prefecture ||
      !values.deviceType ||
      !values.displayName ||
      !values.password
    ) {
      showPopper("请输入必填的字段!");
      return;
    }

    let hasCounty = values.prefecture.endsWith("00");
    if (hasCounty && !values.county) {
      showPopper("县/市/区 不能为空!");
      return;
    }

    let dcode = hasCounty ? values.county : values.prefecture;
    /** 基层接入单位编号(2)+行业编码(2) */
    dcode += Math.floor(Math.random() * 10) + "12";

    /** 设备类型编码(3) */
    dcode += values.deviceType;
    let isDvr = values.deviceType === "111" ? true : false;
    /** devcice sequence number(7) */
    let sn = Math.floor(Math.random() * (isDvr ? 100000 : 10000000)).toString();
    sn = sn.padStart(7, "0");
    dcode += sn;

    let rparams = {
      deviceid: dcode,
      password: values.password,
      name: values.displayName,
      children: values.children
    };
    AsyncFetch("/sapling/register_device", rparams, "POST")
      .then(response => {
        let result = response.result;
        if (result !== 0) {
          showPopper("注册设备错误！");
        } else {
          setValues({ ...values, username: dcode });
          props.onUpdate();
          showPopper("注册设备成功,请到“我的设备”中查看详细信息!");
        }
      })
      .catch(error => {
        showPopper("网络出了点问题！");
      });
  };

  function genProvinceOptions() {
    let pns = gb2260.provinces().map(d => (
      <option key={d.code} value={d.code}>
        {d.name}
      </option>
    ));
    let provinces = [<option key="province-empty" value="" />];
    Array.prototype.push.apply(provinces, pns);
    return provinces;
  }

  function genPrefectures(provinceCode) {
    if (!provinceCode) return <option value="" />;
    let pfs = gb2260.prefectures(provinceCode).map(d => (
      <option key={d.code} value={d.code}>
        {d.name}
      </option>
    ));

    let prefectures = [<option key="prefecture-empty" value="" />];
    Array.prototype.push.apply(prefectures, pfs);
    return prefectures;
  }

  function genCounties(prefectureCode) {
    if (!prefectureCode || !prefectureCode.endsWith("00"))
      return <option value="" />;
    let cts = gb2260.counties(prefectureCode).map(d => (
      <option key={d.code} value={d.code}>
        {d.name}
      </option>
    ));
    let counties = [<option key="county-empty" value="" />];
    Array.prototype.push.apply(counties, cts);
    return counties;
  }

  const open = Boolean(anchorEl);
  const id = open ? "register-device-popper" : undefined;

  return (
    <Paper>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="province-native-simple">省/直辖市</InputLabel>
          <NativeSelect
            value={values.province}
            onChange={handleChange("province")}
            inputProps={{
              name: "province",
              id: "province-native-simple"
            }}
          >
            {genProvinceOptions()}
          </NativeSelect>
          <FormHelperText id="province-helper-text">必选项</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="prefecture-native-simple">市/地区</InputLabel>
          <NativeSelect
            value={values.prefeture}
            onChange={handleChange("prefecture")}
            inputProps={{
              name: "prefecture",
              id: "prefecture-native-simple"
            }}
          >
            {genPrefectures(values.province)}
          </NativeSelect>
          <FormHelperText id="prefecture-helper-text">必选项</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="county-native-simple">县/市/区</InputLabel>
          <NativeSelect
            value={values.prefeture}
            onChange={handleChange("county")}
            inputProps={{
              name: "county",
              id: "county-native-simple"
            }}
          >
            {genCounties(values.prefecture)}
          </NativeSelect>
          <FormHelperText id="county-helper-text">
            必选项(如果有)
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="device-type-native-simple">设备类型</InputLabel>
          <NativeSelect
            value={values.deviceType}
            onChange={handleChange("deviceType")}
            inputProps={{
              name: "deviceType",
              id: "device-type-native-simple"
            }}
          >
            <option value="" />
            <option value={111}>硬盘录像机</option>
            <option value={132}>网络摄像机</option>
            <option value={134}>报警输入设备</option>
            <option value={135}>报警输出设备</option>
            <option value={136}>语音输入设备</option>
            <option value={137}>语音输出设备</option>
            <option value={138}>移动传输设备</option>
            <option value={139}>其它设备</option>
          </NativeSelect>
          <FormHelperText id="device-type-helper-text">必选项</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="device-display-name">请输入显示名称</InputLabel>
          <Input
            id="device-display-name"
            type="text"
            value={values.displayName}
            onChange={handleChange("displayName")}
          />
          <FormHelperText id="dname-helper-text">必填项</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="adornment-password">请输入口令</InputLabel>
          <Input
            id="adornment-password"
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
          <FormHelperText id="password-helper-text">必填项</FormHelperText>
        </FormControl>
        {values.deviceType === "111" && (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-channels">请选择通道个数</InputLabel>
            <Input
              value={values.children}
              margin="dense"
              onChange={handleChange("children")}
              onBlur={handleBlur("children")}
              inputProps={{
                step: 1,
                min: 1,
                max: 32,
                type: "number",
                "aria-labelledby": "channels-input"
              }}
            />
            <FormHelperText id="channels-helper-text">必选项</FormHelperText>
          </FormControl>
        )}
      </form>
      <div className={classes.div_control}>
        <Button
          variant="outlined"
          color="primary"
          aria-describedby={id}
          ref={butEl}
          className={classes.button}
          onClick={handleRegister}
        >
          确 认
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Paper>
            <Typography className={classes.typography}>
              {values.message}
            </Typography>
          </Paper>
        </Popper>
      </div>
    </Paper>
  );
}
