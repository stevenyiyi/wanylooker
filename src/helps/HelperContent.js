import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HelperDirList from "./HelperDirList";
import InstallRun from "./InstallRun";
import ServerConfig from "./ServerConfig";
import DevIntro from "./dev_intro";
import LiveStreamOpen from "./LiveStreamOpen";
import LiveStreamClose from "./LiveStreamClose";
import LiveStreamPublish from "./LiveStreamPublish";
import LiveStreamStop from "./LiveStreamStop";
import PlayStreamRequest from "./PlayStreamRequest";
import PlayStreamStop from "./PlayStreamStop";
import SIPRegister from "./SIPRegister";
import SIPMessage from "./SIPMessage";
import SIPNotify from "./SIPNotify";
import SIPSubscribe from "./SIPSubscribe";
import HTTPCallIntro from "./http_call_intro";
import QueryCatalog from "./QueryCatalog";
import QueryAlarm from "./QueryAlarm";
import PresetQuery from "./PresetQuery";
import QueryInfo from "./QueryInfo";
import QueryRecord from "./QueryRecord";
import QueryStatus from "./QueryStatus";
import ConfigDownload from "./ConfigDownload";
import QueryMobilePosition from "./QueryMobilePosition";
import DeviceReboot from "./DeviceReboot";
import DeviceGuard from "./DeviceGuard";
import DeviceAlarm from "./DeviceAlarm";
import DeviceConfig from "./DeviceConfig";
import PTZControl from "./PTZControl";
import DeviceRecord from "./DeviceRecord";
import DragZoomIn from "./DragZoomIn";
import DragZoomOut from "./DragZoomOut";
import DeviceIFrame from "./DeviceIFrame";
import HomePosition from "./HomePosition";
import HTTPSIPMessage from "./HTTPSIPMessage";
import HTTPSIPNotify from "./HTTPSIPNotify";
import QueryOnlineStreams from "./QueryOnlineStreams";
import StorageLiveFile from "./StorageLiveFile";
import ServerStart from "./ServerStart";
import ServerStop from "./ServerStop";
import SIPStream from "./SIPStream";
import StreamPusher from "./StreamPusher";
const useStyles = makeStyles(them => ({
  root: {
    display: "flex",
    backgroundColor: them.palette.background.paper
  },
  left: {
    width: "20%",
    minWidth: 210,
    overflowY: "auto",
    maxHeight: window.screen.availHeight
  },
  content: {
    width: "80%",
    paddingLeft: them.spacing(2),
    backgroundColor: them.palette.background.paper
  }
}));
export default function HelperContent() {
  const classes = useStyles();
  const [content, setContent] = React.useState("install_run");

  const handleItemClick = key => {
    setContent(key);
  };
  function genContent() {
    switch (content) {
      case "install_run":
        return <InstallRun />;
      case "server_config":
        return <ServerConfig />;
      case "dev_intro":
        return <DevIntro />;
      case "live_stream_open":
        return <LiveStreamOpen />;
      case "live_stream_close":
        return <LiveStreamClose />;
      case "live_stream_stop":
        return <LiveStreamStop />;
      case "live_stream_publish":
        return <LiveStreamPublish />;
      case "play_stream_request":
        return <PlayStreamRequest />;
      case "play_stream_stop":
        return <PlayStreamStop />;
      case "sip_register":
        return <SIPRegister />;
      case "sip_message":
        return <SIPMessage />;
      case "sip_subscribe":
        return <SIPSubscribe />;
      case "sip_notify":
        return <SIPNotify />;
      case "http_call_intro":
        return <HTTPCallIntro />;
      case "query_catalog":
        return <QueryCatalog />;
      case "query_info":
        return <QueryInfo />;
      case "query_record":
        return <QueryRecord />;
      case "query_alarm":
        return <QueryAlarm />;
      case "query_status":
        return <QueryStatus />;
      case "query_preset":
        return <PresetQuery />;
      case "query_config":
        return <ConfigDownload />;
      case "query_mobile_position":
        return <QueryMobilePosition />;
      case "query_online_cameras":
        return <QueryOnlineStreams />;
      case "device_ptz_control":
        return <PTZControl />;
      case "device_control_reboot":
        return <DeviceReboot />;
      case "device_control_record":
        return <DeviceRecord />;
      case "device_control_guard":
        return <DeviceGuard />;
      case "device_control_alarm":
        return <DeviceAlarm />;
      case "device_iframe_send":
        return <DeviceIFrame />;
      case "device_drag_zoomin":
        return <DragZoomIn />;
      case "device_drag_zoomout":
        return <DragZoomOut />;
      case "device_home_position":
        return <HomePosition />;
      case "device_control_config":
        return <DeviceConfig />;
      case "send_sip_message":
        return <HTTPSIPMessage />;
      case "send_sip_notify":
        return <HTTPSIPNotify />;
      case "storage_live_file":
        return <StorageLiveFile />;
      case "server_start":
        return <ServerStart />;
      case "server_stop":
        return <ServerStop />;
      case "sip_stream":
        return <SIPStream />;
      case "stream_pusher":
        return <StreamPusher />;
      default:
        return null;
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <HelperDirList onItemClick={handleItemClick} />
      </div>
      <div className={classes.content}>{genContent()}</div>
    </div>
  );
}
