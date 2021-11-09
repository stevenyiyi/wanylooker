import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: "100%"
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden"
  }
}));
export default function Introduce() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        1.操作顺序：注册您的用户名/登录
        -->设备注册-->我的设备-->本地设备gb28181注册-->子用户注册-->我的子用户
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.如何观看我已接入的直播流？
      </Typography>
      <Typography variant="body1" gutterBottom>
        已接入直播流的观看地址:http://v.anylooker.com
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3.设备注册说明:
      </Typography>
      <Typography variant="subtitle2">
        (1) NVR/DVR
        注册信息填写时，每一个通道编码代表一个摄像头，分配的设备编号只表示NVR/DVR的编码；请一定要按分配的通道编码范围正确填写每一个通道的编码，如果通道编码错误，将无法正确播放。
      </Typography>
      <Typography variant="subtitle2">
        (2) IPC
        注册信息填写时，请将设备编码和通道编码都设置为注册信息中的设备编号。
      </Typography>
      <Typography variant="subtitle2">
        (3)如果本地gb28181设备注册成功，您的设备就会自动连接到我们的nebula云监控了，请打开http://v.anylooker.com，就会出现您的注册的设备观看列表了。
      </Typography>
      <Typography variant="subtitle2">
        (4)
        关于NVR/DVR接入的通道名称，请在您本地的NVR/DVR上设置，当NVR/DVR登录到nebula云端时，播放列表会自动更新通道名称。
      </Typography>
      <Typography variant="body1">
        3.1 设备注册成功后，请在“我的设备”中查看注册的详细信息。
        <img
          className={classes.img}
          src="/imgs/device_reg_info.png"
          alt="查看设备注册信息"
        />
      </Typography>
      <Typography variant="body1" gutterBottom>
        3.2
        打开您本地设备管理网页，找到"平台接入",选择"GB28181",正确填写您的注册信息。
      </Typography>
      <Typography variant="body1" gutterBottom>
        3.2.1 海康NVR接入：
      </Typography>
      <Typography variant="body1" gutterBottom>
        特别注意，在“视频通道编码ID”中,正确添加注册信息中分配的通道编码。
        <img
          className={classes.img}
          src="/imgs/hivision_nvr.png"
          alt="查看设备注册信息"
        />
      </Typography>
      <Typography variant="body1" gutterBottom>
        3.2.2 大华NVR接入：
        <img
          className={classes.img}
          src="/imgs/dahua_nvr.png"
          alt="查看设备注册信息"
        />
      </Typography>
      <Typography variant="body1" gutterBottom>
        3.2.3 大华IPC接入：
        <img
          className={classes.img}
          src="/imgs/dahua_ipc.png"
          alt="查看设备注册信息"
        />
      </Typography>
      <Typography variant="body1" gutterBottom>
        3.3 其它品牌的硬盘录像机和IPC摄像头GB28181接入请参见海康和大华的接入。
      </Typography>
    </div>
  );
}
