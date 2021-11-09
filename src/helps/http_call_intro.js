import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles({
  table: {
    minWidth: 400
  }
});

function createData(method, path, note) {
  return { method, path, note };
}
const rows = [
  createData("GET", "$LIVE_PATH/query_device_catalog", "设备目录查询"),
  createData("GET", "$LIVE_PATH/query_device_record", "设备录像查询"),
  createData("GET", "$LIVE_PATH/query_device_info", "设备信息查询"),
  createData("GET", "$LIVE_PATH/query_device_status", "设备状态查询"),
  createData("GET", "$LIVE_PATH/query_device_alarm", "设备报警查询"),
  createData("GET", "$LIVE_PATH/query_mobile_position", "移动设备位置查询"),
  createData("GET", "$LIVE_PATH/query_device_preset", "设备预置位查询"),
  createData("GET", "$LIVE_PATH/query_device_config", "设备配置查询"),
  createData("GET", "$LIVE_PATH/device_control", "设备云台控制"),
  createData("GET", "$LIVE_PATH/device_control", "设备重启"),
  createData("GET", "$LIVE_PATH/device_control", "设备布防/撤防"),
  createData("GET", "$LIVE_PATH/device_control", "设备录像/取消"),
  createData("GET", "$LIVE_PATH/device_control", "设备报警复位"),
  createData("GET", "$LIVE_PATH/drag_zoom_in", "拉框放大"),
  createData("GET", "$LIVE_PATH/drag_zoom_out", "拉框缩小"),
  createData("GET", "$LIVE_PATH/home_position", "设备看守位控制"),
  createData("POST", "$LIVE_PATH/device_config", "设备配置"),
  createData("POST", "$LIVE_PATH/sip_message", "发送sip消息"),
  createData("POST", "$LIVE_PATH/sip_notify", "发送sip通知"),
  createData("GET", "$LIVE_PATH/query_online_cameras", "查询所有在线直播流")
];
export default function HTTPCallIntro() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        nebula内置简单的http server功能，用户或app service可通过 http request
        调用获取nebula提供的功能。 nebula http 主要提供 gb28181
        的查询和订阅功能。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        安全性考虑：对于普通的web用户，每一次http调用都采用http digest
        认证；对于app service的调用， nebula根据配置文件中的允许的app service ip
        列表进行认证。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        调用方法一览表($LIVE_PATH 变量为
        nebula配置文件fcgi_conf-->service-->live_path的值)：
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>方法</TableCell>
            <TableCell align="left">请求路径</TableCell>
            <TableCell align="left">说明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.method}
                </TableCell>
                <TableCell align="left">{row.path}</TableCell>
                <TableCell align="left">{row.note}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
