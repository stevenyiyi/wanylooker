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
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden"
  }
});

function createData(key, value, note) {
  return { key, value, note };
}
const rows = [
  createData("REQUEST_METHOD", "GET", "HTTP GET方法"),
  createData("REQUEST_URI", "", "SIP直播流的url，参见直播流url格式说明"),
  createData("HTTP_USER_AGENT", "", "User-Agent"),
  createData(
    "HTTP_AUTHORIZATION",
    "",
    "用户的认证信息（rfc2617）仅用于sip digest认证"
  ),
  createData("QUERY_STRING", "", "url 查询字符串"),
  createData("X_CGI_PROTOCOL_TYPE", "SIP/2.0", "直播流的协议类型，SIP/2.0"),
  createData(
    "X_CGI_SIP_EXPIRED",
    "",
    "注册终止的时间段（秒），如果为0则表示注销"
  ),
  createData("REMOTE_ADDR", "", "SIP用户ip"),
  createData("REMOTE_PORT", "", "SIP端口"),
  createData("X_CGI_AUTH_METHOD", "REGISTER", "认证方法，REGISTER"),
  createData("X_CGI_EXTEND_METHOD", "X_CGI_METHOD_SIP_REGISTER", "扩展方法")
];
export default function SIPRegister() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_SIP_REGISTER, 该方法用于通知 app service SIP
        用户注册的消息。
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
      <Typography variant="subtitle1" gutterBottom>
        4.注册说明: 对于用户的sip注册的认证方式， 必须采用http digest 认证，app
        service 采用简单的http digest方式进行认证,即qop="auth" 或 无。
        如果注册成功，nebula 对sip 用户发送查询Catalog的消息和订阅sip
        用户目录变化。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        5.SIP REGISTER 时序图：
      </Typography>
      <img
        className={classes.img}
        src="/imgs/sip_register.png"
        alt="SIP REGISTER 交互图"
      />
    </div>
  );
}
