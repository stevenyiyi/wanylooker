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
  createData("REQUEST_METHOD", "GET", "HTTP GET方法"),
  createData(
    "REQUEST_URI",
    "",
    "RTMP/RTSP/sip/http播放流的url，参见直播流url格式说明"
  ),
  createData("HTTP_USER_AGENT", "", "User-Agent"),
  createData(
    "HTTP_AUTHORIZATION",
    "",
    "用户的认证信息（rfc2617）仅用于rtsp/http, basic/digest认证"
  ),
  createData("QUERY_STRING", "", "url 查询字符串"),
  createData("X_CGI_PROTOCOL_TYPE", "", "播放流的协议类型，http/rtsp/rtmp/sip"),
  createData("X_CGI_PLAYER_ID", "", "播放session的唯一标识"),
  createData("X_CGI_STREAM_ID", "", "直播流唯一id"),
  createData("REMOTE_ADDR", "", "播放用户ip"),
  createData("REMOTE_PORT", "", "播放用户端口"),
  createData("X_CGI_AUTH_METHOD", "", "认证方法，仅digest认证需要"),
  createData(
    "X_CGI_EXTEND_METHOD",
    "X_CGI_METHOD_STREAM_PLAY_REQUEST",
    "扩展方法"
  )
];
export default function PlayStreamRequest() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_STREAM_PLAY_REQUEST, 该方法用于通知app service
        用户请求播放流的消息：
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
    </>
  );
}
