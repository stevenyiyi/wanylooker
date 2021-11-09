import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(them => ({
  root: {
    backgroundColor: "#eeeeee"
  },
  nested: {
    paddingLeft: them.spacing(3)
  },
  nested1: {
    paddingLeft: them.spacing(4)
  },
  nested2: {
    paddingLeft: them.spacing(5)
  }
}));

export default function HelperDirList(props) {
  const classes = useStyles();
  const { onItemClick } = props;
  const [open0, setOpen0] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(true);
  const [open4, setOpen4] = React.useState(true);
  const [open5, setOpen5] = React.useState(true);
  const handleDirClick = index => {
    switch (index) {
      case 0:
        setOpen0(!open0);
        break;
      case 1:
        setOpen1(!open1);
        break;
      case 2:
        setOpen2(!open2);
        break;
      case 3:
        setOpen3(!open3);
        break;
      case 4:
        setOpen4(!open4);
        break;
      case 5:
        setOpen5(!open5);
        break;
      default:
        break;
    }
  };

  const handleItemClick = key => {
    onItemClick(key);
  };

  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemText
          primary="安装/运行/日志"
          onClick={() => {
            handleItemClick("install_run");
          }}
        />
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="配置"
          onClick={() => {
            handleItemClick("server_config");
          }}
        />
      </ListItem>
      <ListItem button onClick={() => handleDirClick(0)}>
        <ListItemText primary="网站后台开发" />
        {open0 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary="概述"
              onClick={() => {
                handleItemClick("dev_intro");
              }}
            />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleDirClick(1)}
          >
            <ListItemText primary="直播流事件" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("live_stream_open");
                }}
              >
                <ListItemText primary="直播流上线" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("live_stream_publish");
                }}
              >
                <ListItemText primary="直播流开始发布" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("live_stream_stop");
                }}
              >
                <ListItemText primary="直播流停止发布" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("live_stream_close");
                }}
              >
                <ListItemText primary="直播流下线" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("play_stream_request");
                }}
              >
                <ListItemText primary="请求播放流" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("play_stream_stop");
                }}
              >
                <ListItemText primary="请求者停止播放" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("storage_live_file");
                }}
              >
                <ListItemText primary="录像文件储存通知" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleDirClick(2)}
          >
            <ListItemText primary="SIP事件" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("sip_register");
                }}
              >
                <ListItemText primary="SIP注册/注销" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("sip_subscribe");
                }}
              >
                <ListItemText primary="SIP订阅/取消" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("sip_message");
                }}
              >
                <ListItemText primary="SIP消息" />
              </ListItem>
              <ListItem
                button
                className={classes.nested1}
                onClick={() => {
                  handleItemClick("sip_notify");
                }}
              >
                <ListItemText primary="SIP通知" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleItemClick("server_start")}
          >
            <ListItemText primary="nebula启动事件" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleItemClick("server_stop")}
          >
            <ListItemText primary="nebula停止事件" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => handleDirClick(3)}>
        <ListItemText primary="HTTP调用接口" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => {
              handleItemClick("http_call_intro");
            }}
          >
            <ListItemText primary="概述" />
          </ListItem>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => handleDirClick(4)}
          >
            <ListItemText primary="GB28181设备查询" />
            {open4 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_catalog");
                }}
              >
                <ListItemText primary="设备目录查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_record");
                }}
              >
                <ListItemText primary="设备录像查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_alarm");
                }}
              >
                <ListItemText primary="设备报警查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_info");
                }}
              >
                <ListItemText primary="设备信息查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_status");
                }}
              >
                <ListItemText primary="设备状态查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_config");
                }}
              >
                <ListItemText primary="设备配置查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_preset");
                }}
              >
                <ListItemText primary="设备预置位查询" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("query_mobile_position");
                }}
              >
                <ListItemText primary="移动设备位置查询" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => handleDirClick(5)}
          >
            <ListItemText primary="GB28181设备控制" />
            {open5 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_ptz_control");
                }}
              >
                <ListItemText primary="设备云台控制" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_control_reboot");
                }}
              >
                <ListItemText primary="设备重启" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_control_guard");
                }}
              >
                <ListItemText primary="设备布防/撤防" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_control_record");
                }}
              >
                <ListItemText primary="设备录像/取消" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_control_alarm");
                }}
              >
                <ListItemText primary="设备报警复位" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_control_config");
                }}
              >
                <ListItemText primary="设备配置" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_drag_zoomin");
                }}
              >
                <ListItemText primary="拉框放大" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_drag_zoomout");
                }}
              >
                <ListItemText primary="拉框缩小" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_home_position");
                }}
              >
                <ListItemText primary="设备看守位控制" />
              </ListItem>
              <ListItem
                button
                className={classes.nested2}
                onClick={() => {
                  handleItemClick("device_iframe_send");
                }}
              >
                <ListItemText primary="关键帧发送" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => {
              handleItemClick("send_sip_notify");
            }}
          >
            <ListItemText primary="发送通知" />
          </ListItem>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => {
              handleItemClick("send_sip_message");
            }}
          >
            <ListItemText primary="发送消息" />
          </ListItem>
          <ListItem
            button
            className={classes.nested1}
            onClick={() => handleItemClick("query_online_cameras")}
          >
            <ListItemText primary="查询在线直播流" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={() => handleItemClick("sip_stream")}>
        <ListItemText primary="SIP直播流说明" />
      </ListItem>
      <ListItem button onClick={() => handleItemClick("stream_pusher")}>
        <ListItemText primary="直播推流" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="开发案例" />
      </ListItem>
    </List>
  );
}
