import React from "react";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
  createData("DeviceID", "必选", "通道IPC设备编码"),
  createData("StartTime", "必选", "录像开始时间(iso8601时间格式)"),
  createData(
    "EndTime",
    "可选",
    "录像结束时间(iso8601时间格式),如不选则表示截止到当前。"
  )
];
export default function QueryRecord() {
  const [xsd, setXsd] = React.useState("");
  const classes = useStyles();
  React.useEffect(() => {
    let req = new Request("/xsd/DeviceQueryRecordResponse.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsd(text);
      });
    });
  }, []);
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：GET
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/query_device_record
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
        返回结果：设备的录像列表信息，xml schema 表示如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsd}
        rowsMax={20}
        placeholder="Empty"
      />
    </>
  );
}
