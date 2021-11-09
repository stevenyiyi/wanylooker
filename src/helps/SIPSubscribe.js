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
  createData("REQUEST_URI", "", "SIP直播流的url，参见直播流url格式说明"),
  createData("HTTP_USER_AGENT", "", "User-Agent"),
  createData("QUERY_STRING", "", "url 查询字符串"),
  createData("X_CGI_PROTOCOL_TYPE", "SIP/2.0", "协议类型，SIP/2.0"),
  createData(
    "X_CGI_SIP_EXPIRED",
    "",
    "订阅终止的时间段（秒），如果为0则表示取消订阅"
  ),
  createData("X_CGI_SIP_EVENT", "", "SIP Event"),
  createData("X_CGI_SIP_SUBSCRIBE_STATE", "", "SIP Event state"),
  createData("X_CGI_SIP_DIALOGID", "", "对话的唯一id"),
  createData("REMOTE_ADDR", "", "SIP用户ip"),
  createData("REMOTE_PORT", "", "SIP端口"),
  createData("REMOTE_USER", "", "用户名"),
  createData("CONTENT_TYPE", "", "消息内容的类型"),
  createData("CONTENT_LENGTH", "", "消息内容的长度"),
  createData("X_CGI_EXTEND_METHOD", "X_CGI_METHOD_SIP_SUBSCRIBE", "扩展方法")
];
export default function SIPSubscribe() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_SIP_SUBSCRIBE, 该方法将用户的sip subscribe 传递给
        app service处理。
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
        2.正文内容: 消息内容, 长度为CONTENT-LENGTH的值。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3.返回: http response, app service 根据业务定义。
      </Typography>
    </div>
  );
}
