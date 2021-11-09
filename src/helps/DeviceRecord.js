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
  createData("DeviceID", "必选", "设备编码"),
  createData("RecordCmd", "必选, Record/StopRecord", "设备录像开启/停止。")
];

export default function DeviceRecord() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：GET
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/device_control
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
        返回结果：HTTP Response status code， 无正文。
      </Typography>
    </>
  );
}
