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
  createData("REQUEST_URI", "", "RTMP/RTSP直播流的url，参见直播流url格式说明"),
  createData("QUERY_STRING", "", "url 查询字符串"),
  createData("X_CGI_STREAM_ID", "", "直播流唯一id"),
  createData("X_CGI_AUDIO_SAMPLERATE", "", "声音采样率"),
  createData("X_CGI_AUDIO_CHANNELS", "", "声音通道数"),
  createData("X_CGI_AUDIO_SAMPLE_BITS", "", "声音每一样例bits"),
  createData("X_CGI_VIDEO_CODEC", "", "视频编码名称"),
  createData("X_CGI_VIDEO_WIDTH", "", "视频宽度"),
  createData("X_CGI_VIDEO_HEIGHT", "", "视频高度"),
  createData("X_CGI_FRAME_RATE", "", "帧率（fps/second)"),
  createData(
    "X_CGI_EXTEND_METHOD",
    "X_CGI_METHOD_STREAM_PUBLISHING",
    "扩展方法"
  )
];
export default function LiveStreamPublish() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_STREAM_PUBLISHING, 该方法用于通知app service
        直播流开始向nebula传输视/音流的消息.
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
