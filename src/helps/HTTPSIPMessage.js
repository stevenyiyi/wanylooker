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
  createData(
    "To",
    "必选",
    "接收者的username,可同时发送到多个username，中间用';'分隔," +
      "如果username为直播流id，nebula会向所有正在观看直播的用户广播此消息。"
  )
];

export default function HTTPSIPMessage() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：POST
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/sip_message
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        HTTP请求头部扩展参数：见下表。
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
        请求消息正文格式及内容：由app service定义。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        返回结果：HTTP Response status code， 无正文。
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        注意，该请求只适用于app service发起请求。
      </Typography>
    </>
  );
}
