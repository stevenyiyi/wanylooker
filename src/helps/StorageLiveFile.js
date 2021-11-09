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
  createData("X_CGI_FILE_NAME", "", "直播文件名"),
  createData("X_CGI_START_TIME", "", "文件开始时间(ms)"),
  createData("X_CGI_END_TIME", "", "文件结束时间(ms)"),
  createData("X_CGI_EXTEND_METHOD", "X_CGI_METHOD_STORAGE_FILE", "扩展方法")
];
export default function LiveStreamStop() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        扩展方法：X_CGI_METHOD_STORAGE_FILE, 该方法用于通知app service
        直播流存储文件的消息。
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
