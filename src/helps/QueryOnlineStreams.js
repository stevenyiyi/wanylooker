import React from "react";
import Typography from "@material-ui/core/Typography";
export default function QueryOnlineStreams() {
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        注意，该请求只适用于app service发起请求。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求方法：GET
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        请求路径：$LIVE_PATH/query_online_cameras
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        返回结果：文本格式；所有在线直播流的streamid，以“;”进行分隔。
      </Typography>
    </>
  );
}
