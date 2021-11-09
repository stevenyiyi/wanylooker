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
  createData("DeviceID", "必选", "设备编码"),
  createData(
    "ConfigType",
    "必选",
    "查询配置参数类型,可查询的配置类型包括基本参数配置:BasicParam,视频参数范围:VideoParamOpt,SVAC 编码配置:SVACEncodeConfig,SVAC 解码配置 :SVACDecodeConfig."
  )
];
export default function ConfigDownload() {
  const [xsd, setXsd] = React.useState("");
  const classes = useStyles();
  React.useEffect(() => {
    let req = new Request("/xsd/ConfigDownloadResponse.xsd");
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
        请求路径：$LIVE_PATH/query_device_config
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
          {rows.map(row => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="left">{row.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="subtitle1" gutterBottom>
        返回结果：设备的配置信息，xml schema 表示如下：
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
