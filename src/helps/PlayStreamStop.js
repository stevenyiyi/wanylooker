import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 400
  }
});

function createData(key, value, note) {
  return { key, value, note };
}
const rows = [
  createData("REQUEST_METHOD", "GET", "HTTP GET方法"),
  createData(
    "REQUEST_URI",
    "",
    "RTMP/RTSP/sip/http播放流的url，参见直播流url格式说明"
  ),
  createData("QUERY_STRING", "", "url 查询字符串"),
  createData("X_CGI_PLAYER_ID", "", "播放session的唯一标识"),
  createData("X_CGI_STREAM_ID", "", "直播流唯一id"),
  createData("X_CGI_FLOW_DOWN", "", "下行的字节数"),
  createData("X_CGI_FLOW_UP", "", "上传的字节数"),
  createData("X_CGI_AUTH_METHOD", "", "认证方法，仅digest认证需要"),
  createData("X_CGI_EXTEND_METHOD", "X_CGI_METHOD_STREAM_PLAY_STOP", "扩展方法")
];
export default function PlayStreamStop() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_STREAM_PLAY_STOP,该方法用于通知app service
        用户停止播放流的消息。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        1.FASTCGI/HTTP 参数:
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
        2.正文内容: 无。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3.返回: http response, 仅状态码，无正文。
      </Typography>
    </div>
  );
}
