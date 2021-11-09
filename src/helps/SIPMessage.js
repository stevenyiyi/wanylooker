import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
  createData("REMOTE_ADDR", "", "SIP用户ip"),
  createData("REMOTE_PORT", "", "SIP端口"),
  createData("REMOTE_USER", "", "用户名"),
  createData("CONTENT_TYPE", "", "消息内容的类型"),
  createData("CONTENT_LENGTH", "", "消息内容的长度"),
  createData("X_CGI_EXTEND_METHOD", "X_CGI_METHOD_SIP_MESSAGE", "扩展方法")
];
export default function SIPMessage() {
  const classes = useStyles();
  const [xsdCatalog, setXsdCatalog] = React.useState("");
  const [xsdAlarm, setXsdAlarm] = React.useState("");
  const [xsdMobilePosition, setXsdMobilePosition] = React.useState("");
  const [xsdBroadcast, setXsdBroadcast] = React.useState("");
  React.useEffect(() => {
    let req = new Request("/xsd/DeviceQueryCatalogResponse.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsdCatalog(text);
      });
    });
    req = new Request("/xsd/AlarmMessage.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsdAlarm(text);
      });
    });
    req = new Request("/xsd/MobilePosition.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsdMobilePosition(text);
      });
    });
    req = new Request("/xsd/Broadcast.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsdBroadcast(text);
      });
    });
  }, []);
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_SIP_MESSAGE, 该方法将sip message 传递给 app
        service。
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
      <Typography variant="subtitle1" gutterBottom>
        4. GB28181设备sip消息通知
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        4.1 GB28181设备REGISTER成功后，nebula会向设备发送查询Catalog的消息，
        设备回复查询Catalog Response，nebula将结果以X_CGI_SIP_MESSAGE方法通知app
        service。schema 文件格式如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsdCatalog}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        4.2 GB28181设备报警产生时，设备向nebula发送报警通知，
        nebula将通知以X_CGI_SIP_MESSAGE方法通知app service。schema
        文件格式如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsdAlarm}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        4.3 GB28181移动设备位置变化时，设备向nebula发送位置变化通知，
        nebula将通知以X_CGI_SIP_MESSAGE方法通知app service。schema
        文件格式如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsdMobilePosition}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        4.4 GB28181语音设备广播时，设备向nebula发送broadcast通知，
        nebula将通知以X_CGI_SIP_MESSAGE方法通知app service。schema
        文件格式如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsdBroadcast}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        4.5 其它sip message，nebula将通知以X_CGI_SIP_MESSAGE方法通知app
        service。
      </Typography>
    </div>
  );
}
