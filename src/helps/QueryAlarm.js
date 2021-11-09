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

function createData(key, value, note) {
  return { key, value, note };
}
const rows = [
  createData("DeviceID", "必选", "报警设备编码"),
  createData(
    "AlarmPriority",
    "可选",
    "详见SIPMessage,如果选择多个优先级以'/'号分隔，如：1/2/3"
  ),
  createData(
    "AlarmMethod",
    "可选",
    "报警方式条件(可选),取值0为全部,1为电话报警,2为设备报警,3为短信报警,4为GPS报 警 ,5 为视频报警 ,6 为设备故障报警 ,7 其他报警;可以为直接组合 如 12 为电话报警或设备报警"
  ),
  createData("AlarmType", "可选", "报警类型(可选),详见SIPMessage."),
  createData(
    "StartAlarmTime",
    "可选",
    "报警发生开始时间(iso8601时间格式),如不选则表示从当前开始"
  ),
  createData(
    "EndAlarmTime",
    "可选",
    "报警发生结束时间(iso8601时间格式),如不选则表示无结束时间。"
  )
];

export default function QueryAlarm() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        注意，该请求只适用于app service发起请求。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：GET
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/query_device_alarm
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求参数：见下表。
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell align="left">value</TableCell>
            <TableCell align="left">说明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
                <TableCell align="left">{row.note}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography variant="subtitle1" gutterBottom>
        返回结果：当设备发送警报信息时nebula 将以SIP MESSAGE通知app
        service，请详见SIPMessage-->Alarm.
      </Typography>
    </>
  );
}
