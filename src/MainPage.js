import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  content: {
    width: "100%", // Fix IE 11 issue.
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  table: {
    minWidth: 400
  }
}));

function createData(no, func, note) {
  return { no, func, note };
}

const rows = [
  createData(
    1,
    "gb28181设备接入",
    "全面支持gb28181设备接入,如网络摄像头(IPC)/硬盘录像机(DVR/NVR/EVR)"
  ),
  createData(2, "RTMP直播推流", "支持rtmp推流,如obs直播推流"),
  createData(3, "RTSP直播推流", "支持rtsp推流，如某些rtsp推流设备"),
  createData(
    4,
    "hls-mpeg2ts/hls-fmp4/mpeg-dash 播放协议",
    "这三种播放协议的支持，使用户可以在html5网页中无插件观看直播视频"
  ),
  createData(5, "websocket/mpeg2ts 播放协议", "用户可以在网页中实现低延时直播"),
  createData(6, "SIP协议支持", "用户可以在app中实现p2p实时视频应用"),
  createData(
    7,
    "fastcgi/http 协议支持",
    "可以更好与网站后台进行复杂业务数据交互"
  ),
  createData(
    8,
    "H265/HEVC编码支持",
    "全面支持h265/aac/he-aac直播，带宽成本将极大降低"
  ),
  createData(9, "手机端推流/播放模块", "可进行复杂直播业务的开发"),
  createData(10, "录像功能", "将直播流保存为fmp4/mpeg2ts格式"),
  createData(11, "摄像头web云台控制/报警/位置/录像等功能", "gb21818协议部分")
];

export default function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Typography variant="subtitle1" gutterBottom>
        1. nebula是什么？
      </Typography>
      <Typography variant="body1" gutterBottom>
        nebula
        是一个全异步/高性能/高并发的流媒体直播云服务器软件，全面支持html5直播，简单到只需输入一个url地址，在任何移动设备（手机/pad等）或
        电脑上即可观看您的直播。
      </Typography>
      <Typography variant="body1" gutterBottom>
        为什么高性能/高并发？nebula采用c/c++实现全部代码，IO服务采用全异步事件，linux/epoll，freesbd
        macosx/kqueue,windows/iocp，并针对不同的操作系统作了特殊的算法优化。
      </Typography>
      <Typography variant="body1" gutterBottom>
        nebula在核心的数据结构方面全部采用了lockless/wait-free无锁算法，以适应多核cpu的高度并发。
      </Typography>
      <Typography variant="body1" gutterBottom>
        对接收和发送的网络包，实现了zero-copy技术。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2. nebula
        支持的协议：gb28181/sip/rtsp/rtmp/rtp/mpeg-dash/hls-fmp4/fastcgi/http
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3. nebula 主要功能：
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell align="left">功能</TableCell>
            <TableCell align="left">说明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.no}>
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell align="left">{row.func}</TableCell>
              <TableCell align="left">{row.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="subtitle1" gutterBottom>
        4. 主要应用场景：
      </Typography>
      <Typography variant="body1" gutterBottom>
        4.1 IPC/NVR/DVR 监控云 监控直播 幼儿园直播 物联网直播/存储。
      </Typography>
      <Typography variant="body1" gutterBottom>
        4.2 手机直播应用。
      </Typography>
      <Typography variant="body1" gutterBottom>
        4.3 游戏直播应用。
      </Typography>
      <Typography variant="body1" gutterBottom>
        4.4 P2P视频直播应用。
      </Typography>
      <Typography variant="body1" gutterBottom>
        4.5 远程教育/远程医疗等。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        5. 软件支持的服务器操作系统：linux/freebsd/macosx/windows。
      </Typography>
    </div>
  );
}
