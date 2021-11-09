import React from "react";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
export default function DeviceConfig() {
  const [xsd, setXsd] = React.useState("");
  React.useEffect(() => {
    let req = new Request("/xsd/DeviceConfig.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsd(text);
      });
    });
  }, []);
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：POST
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/device_config
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        POST请求数据，xml,schema 文件如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsd}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        返回结果：HTTP Response status code， 无正文。
      </Typography>
    </>
  );
}
