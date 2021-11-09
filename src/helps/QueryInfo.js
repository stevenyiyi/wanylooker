import React from "react";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
export default function QueryInfo() {
  const [xsd, setXsd] = React.useState("");
  React.useEffect(() => {
    let req = new Request("/xsd/DeviceQueryInfoResponse.xsd");
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
        请求路径：$LIVE_PATH/query_device_info
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求参数：DeviceID 设备的唯一编码。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        返回结果：设备的信息，xml schema 表示如下：
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
