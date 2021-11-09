import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
function createData(method, name) {
  return { method, name };
}
const rows = [
  createData("X_CGI_METHOD_STREAM_OPEN", "直播流上线"),
  createData("X_CGI_METHOD_STREAM_CLOSE", "直播流下线"),
  createData("X_CGI_METHOD_STREAM_PUBLISHING", "直播流开始发布"),
  createData("X_CGI_METHOD_STREAM_PUBLISH_STOP", "直播流停止发布"),
  createData("X_CGI_METHOD_STREAM_PLAY_REQUEST", "请求播放流"),
  createData("X_CGI_METHOD_STREAM_PLAYER_STOP", "请求者停止播放"),
  createData("X_CGI_METHOD_SIP_REGISTER", "SIP注册/注销"),
  createData("X_CGI_METHOD_SIP_MESSAGE", "SIP消息"),
  createData("X_CGI_METHOD_SIP_SUBSCRIBE", "SIP订阅/取消"),
  createData("X_CGI_METHOD_SIP_NOTIFY", "SIP订阅通知"),
  createData("X_CGI_METHOD_STORAGE_FILE", "录像文件存储通知"),
  createData("X_CGI_METHOD_SERVER_STOP", "nebula停止服务通知"),
  createData("X_CGI_METHOD_SERVER_START", "nebula运行通知")
];
export default function DevIntro() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        1.名词术语
      </Typography>
      <Typography variant="body1">nebula --流媒体云服务器软件</Typography>
      <Typography variant="body1" gutterBottom>
        app service -- 网站后台服务程序
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.nebula与app server数据交互说明：
      </Typography>
      <img
        className={classes.img}
        src="/imgs/nebula_app.png"
        alt="nebula/app service 交互图"
      />
      <Typography variant="subtitle2" gutterBottom>
        本文档主要定义nebula 与 app service 之间的数据交互开发接口，
        为了方便将nebula提供的流媒体服务功能更好的融合到app service中，
        我们采用了fastcgi/http协议作为nebula向app service传递数据的通信接口，
        nebula能与任何能支持fastcgi或http协议的app service进行通信，
        如php/asp.net/node.js/perl/python等任何web app service。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.1 nebula 传递消息到 app
        server数据格式说明：消息参数为key/value，纯文本表示，消息体为xml格式。
      </Typography>
      <img
        className={classes.img}
        src="/imgs/nebula_app_defines.png"
        alt="nebula/app service 消息格式"
      />
      <Typography variant="body1" gutterBottom>
        app service 协议为fastcgi时， nebula传递到app
        service消息参数为fastcgi的环境变量扩展,fastcgi消息体采用xml格式。
      </Typography>
      <Typography variant="body1" gutterBottom>
        app service 协议为http时， nebula传递到app
        service消息参数为http头部变量扩展,http消息体采用xml格式。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.2 app service 向nebula请求数据采用http request
        的方式，消息体采用xml格式。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3.nebula fastcgi 扩展方法key说明：
      </Typography>
      <Typography variant="body1" gutterBottom>
        为考虑 app service 处理数据方便，我们对每一条从nebula传递到app
        service的消息，
        定义一个扩展的变量key，取名为：X_CGI_EXTEND_METHOD，表示扩展的方法键；
        app service处理时应根据X_CGI_EXTEND_METHOD的值作具体处理。
      </Typography>
      <Typography variant="body1" gutterBottom>
        另外每一条fastcgi/http消息，根据具体情景，我们都定义了其它扩展的参数，
        所有扩展参数key都以"X_CGI_"作为前缀，具体详请见每一fastcgi/http消息的说明。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        4.参数 X_CGI_EXTEND_METHOD 定义:
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>X_CGI_EXTEND_METHOD</TableCell>
            <TableCell align="left">名称</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.method}>
                <TableCell component="th" scope="row">
                  {row.method}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography variant="subtitle2" gutterBottom>
        5. 网站后台关于fastcgi/http
        的选择，如果采用fastcgi方式，nebula会直接将消息传递到app
        service，效率会更高一点； 如果采用http的方式，nebula发送的消息会经过http
        server，可能效率低一点。对于分布式的app
        service,建议使用http的方式较方便； 如果app
        service与nebula在同一机器，建议使用fastcgi的方式有更高的效率。
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        6. 特别说明.对于每一个向app service 请求的扩展参数方法， app
        service必须给予http回应，如果2秒钟内app service
        没有回应，nebula将视为目标不可到达，丢弃请求， 并置app
        server为断线状态，20秒后才会重新连接到app service。
      </Typography>
    </>
  );
}
