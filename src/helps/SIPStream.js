import React from "react";
import Typography from "@material-ui/core/Typography";

export default function SIPStream() {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        SIP 协议， 详见rfc3261.
      </Typography>
      <Typography variant="body1" gutterBottom>
        1、需要注意的是：nebula sip协议只支持udp。
      </Typography>
      <Typography variant="body1" gutterBottom>
        2、如果sip客户端是一个单一的流媒体设备，则app
        service应根据sip客户端发送sip REGISTER命令决定上线/下线情况。
      </Typography>
      <Typography variant="body1" gutterBottom>
        3、如果sip客户端是一个容器流媒体设备(NVR/DVR等)，则app
        service应根据Catalog消息判断子设备上线/下线情况。
      </Typography>
      <Typography variant="body1" gutterBottom>
        4、如果sip客户端状态发生变化(上线/下线/ip改变)，nebula将发送sip
        NOTIFY(Catalog) 给app service。请参见“SIP 通知“。
      </Typography>
    </div>
  );
}
