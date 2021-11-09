import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CameraPlayer from "./CameraPlayer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PlaylistPlay from "@material-ui/icons/Subscriptions";
import CamcorderOff from "@material-ui/icons/VideocamOff";
import Camcorder from "@material-ui/icons/Videocam";
import SimpleSnackbar from "./SimpleSnackbar";
import WorkButton from "./WorkButton";
import Hls from "hls.js";
import { genPlayUri, fixCameraList } from "../utils/utils";
import AsyncFetch from "../utils/AsyncFetch";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    margin: "0px",
    padding: "0px",
    flexFlow: "row",
    justifyContent: "center"
  },
  mobile_content: {
    display: "flex",
    margin: "0px",
    padding: "0px",
    flexFlow: "column"
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  normal: {
    paddingLeft: theme.spacing(2)
  },
  player: {
    display: "flex",
    minWidth: "640px",
    maxWidth: "1024px",
    overflow: "hidden",
    backgroundColor: "black"
  },
  mobile_player: {
    display: "flex",
    overflow: "hidden",
    width: "100%",
    backgroundColor: "black"
  }
}));

export default function CameraList(props) {
  const { url, mobile } = props;
  const [groups, setGroups] = React.useState(null);
  const [cameras, setCameras] = React.useState(null);
  const [playUri, setPlayUri] = React.useState("");
  const [playerRefreshId, setPlayerRefreshId] = React.useState(0);
  const [message, setMessage] = React.useState({
    open: false,
    variant: "error",
    text: ""
  });

  const timer = React.useRef();
  const classes = useStyles();

  React.useEffect(() => {
    refreshData();
    return () => {
      clearInterval(timer.current);
      timer.current = 0;
    };
  }, []);

  const handleCloseMessage = () => {
    setMessage({ ...message, open: false });
  };

  const onGroupClick = event => {
    const idx = event.currentTarget.tabIndex;
    console.log("onGroupClick event:" + event);
    setGroups(
      groups.map((group, _index) =>
        _index === idx ? { ...group, unfold: !group.unfold } : group
      )
    );
  };

  const handlePlayerSuccess = uri => {
    console.log(`playing ${uri} success!`);
    if (timer.current && timer.current > 0) {
      clearInterval(timer.current);
      timer.current = 0;
    }
  };
  /** 处理播放错误 */
  const handlePlayerError = error => {
    let msg = "";
    let variant = "error";
    if (error instanceof MediaError) {
      let ecode = error.code;
      switch (ecode) {
        case MediaError.MEDIA_ERR_NETWORK:
          variant = "error";
          msg = "网络出了点问题，自动刷新播放列表...";
          refreshData();
          break;
        case MediaError.MEDIA_ERR_DECODE:
          variant = "error";
          msg = "浏览器不支持播放该视频格式!";
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          variant = "warning";
          msg = "您的帐户正在观看,请先退出,20秒后自动重新连接...";
          triggerPlayerTimer();
          break;
        case MediaError.MEDIA_ERR_ABORTED:
          variant = "info";
          msg = "请求播放终止.";
          break;
        default:
          variant = "error";
          msg = "未知错误!";
          refreshData();
          break;
      }
    } else {
      console.log("Error,type:" + error.type + " details:" + error.details);
      if (error.type === Hls.ErrorTypes.NETWORK_ERROR) {
        let details = error.details;
        if (
          details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR ||
          details === Hls.ErrorDetails.LEVEL_LOAD_ERROR ||
          details === Hls.ErrorDetails.AUDIO_TRACK_LOAD_ERROR ||
          details === Hls.ErrorDetails.FRAG_LOAD_ERROR ||
          details === Hls.ErrorDetails.KEY_LOAD_ERROR
        ) {
          let rcode = error.response.code;
          if (rcode === 403) {
            variant = "warning";
            msg = "您的帐户正在观看,请先退出,20秒后将自动重新连接...";
            triggerPlayerTimer();
          } else if (rcode === 404) {
            variant = "error";
            msg = "观看的流已经下线，将重新刷新观看列表!";
            refreshData();
          } else {
            variant = "error";
            msg = "错误代码:" + rcode;
          }
        } else if (
          details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ||
          details === Hls.ErrorDetails.KEY_LOAD_TIMEOUT ||
          details === Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT
        ) {
          variant = "error";
          msg = "加载文件超时，请检查网络是否正常...";
          refreshData();
        } else if (
          details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR ||
          details === Hls.ErrorDetails.LEVEL_EMPTY_ERROR
        ) {
          variant = "error";
          msg = "解析mainfest错误:" + error.reason;
        } else {
          variant = "error";
          msg = "服务器出了点问题，请稍候再试!";
          refreshData();
        }
      } else if (error.type === Hls.ErrorTypes.MEDIA_ERROR) {
        variant = "error";
        msg = "此媒体无法播放！";
      } else {
        variant = "error";
        msg = "无法播放,请稍候再试!";
      }
    }
    setMessage({ ...message, open: true, variant: variant, text: msg });
  };

  const triggerPlayerTimer = () => {
    if (!timer.current || timer.current === 0) {
      timer.current = setInterval(() => {
        setPlayerRefreshId(playerRefreshId => playerRefreshId + 1);
      }, 20000);
    }
  };

  /** click item camera*/
  const onCameraClick = ccam => {
    console.log(JSON.stringify(ccam));
    let uri = genPlayUri(ccam.oid);
    setPlayUri(uri);
    /** 首先在 camera groups 中查找*/
    let issel = false;
    if (groups) {
      setGroups(
        groups.map(group => {
          //Clear camera selected
          group.cameras.forEach(cam => {
            if (cam.oid === ccam.oid) {
              cam.selected = true;
              issel = true;
            } else {
              cam.selected = false;
            }
          });
          return group;
        })
      );
    }
    if (!issel && cameras) {
      /**其次在最上层 cameras 中查找*/
      setCameras(
        cameras.map(cam => {
          let newcam = { ...cam };
          if (newcam.oid === ccam.oid) {
            newcam.selected = true;
          } else {
            newcam.selected = false;
          }
          return newcam;
        })
      );
    }
  };

  const refreshData = () => {
    let qparams = { ts: Date.now() };
    AsyncFetch(url, qparams)
      .then(response => {
        let camlist = response.camlist;
        let puri = fixCameraList(camlist);
        setGroups(camlist.groups);
        setCameras(camlist.cameras);
        setPlayUri(puri);
      })
      .catch(error => {
        console.log(
          `Fetch url:${url} error:${error.name} desc:${error.message}`
        );
      });
  };

  function renderPlayer(uri) {
    if (!playUri) {
      return null;
    }

    let width = document.body.clientWidth;
    if (!props.mobile) {
      width = width * 0.7;
      if (width > 1024) width = 1024;
    }
    let height = (width * 9) / 16;

    let hlsconfig = {
      liveDurationInfinity: true,
      xhrSetup: function(xhr, url) {
        xhr.withCredentials = true; // do send cookies
      },
      fetchSetup: function(context, initParams) {
        // Always send cookies, even for cross-origin calls.
        initParams.credentials = "include";
        return new Request(context.url, initParams);
      }
    };

    let vprops = {};
    const autoplay = true;
    return (
      <CameraPlayer
        url={uri}
        width={width}
        height={height}
        autoplay={autoplay}
        hlsConfig={hlsconfig}
        poster=""
        videoProps={vprops}
        onError={handlePlayerError}
        onSuccess={handlePlayerSuccess}
        refreshId={playerRefreshId}
      />
    );
  }

  function genCameraList(camlist, nested) {
    const clist = camlist.map(cam => {
      const scam = JSON.stringify(cam);
      if (cam.status !== 1) {
        return (
          <ListItem
            alignItems="flex-start"
            className={nested ? classes.nested : classes.normal}
            button
            key={cam.oid}
            disabled
          >
            <ListItemIcon>
              <CamcorderOff />
            </ListItemIcon>
            <ListItemText primary={cam.name} />
          </ListItem>
        );
      } else {
        return (
          <ListItem
            alignItems="flex-start"
            className={nested ? classes.nested : classes.normal}
            selected={cam.selected}
            button
            key={cam.oid}
            itemvalue={scam}
            onClick={event => onCameraClick(cam)}
          >
            <ListItemIcon>
              <Camcorder />
            </ListItemIcon>
            <ListItemText primary={cam.name} />
          </ListItem>
        );
      }
    });
    return clist;
  }

  function genGroupList(camgroups) {
    let count = 0;
    return camgroups.map(group => (
      <div key={Math.random().toString()}>
        <ListItem
          alignItems="flex-start"
          tabIndex={count++}
          key={group.gid.toString()}
          button
          onClick={event => onGroupClick(event)}
        >
          <ListItemIcon>
            <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary={group.name} />
          {group.unfold ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {genGroupCameraList(group.cameras, group.unfold)}
      </div>
    ));
  }

  function genGroupCameraList(camlist, unfold) {
    return (
      <Collapse in={unfold} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {genCameraList(camlist, true)}
        </List>
      </Collapse>
    );
  }

  // render
  // Normally, just render children
  console.log("CameraList render!");
  let clsContent = null;
  let clsPlayer = null;
  let CamDiv = null;
  if (mobile) {
    const sch = window.screen.height;
    const vh = (sch * 9) / 16;
    const ch = sch - vh;
    console.log("CameraList div maxHeight:" + ch);
    CamDiv = styled("div")({
      display: "flex",
      flexGrow: 1,
      maxHeight: ch,
      overflowY: "scroll"
    });
    clsPlayer = classes.mobile_player;
    clsContent = classes.mobile_content;
  } else {
    CamDiv = styled("div")({
      display: "flex",
      minWidth: "200px",
      maxHeight: "576px",
      overflowY: "scroll"
    });
    clsPlayer = classes.player;
    clsContent = classes.content;
  }

  return (
    <div className={clsContent}>
      <div className={clsPlayer}>{renderPlayer(playUri)}</div>
      <CamDiv>
        <List className={classes.root} component="nav">
          {cameras && genCameraList(cameras, false)}
          {groups && genGroupList(groups)}
        </List>
      </CamDiv>
      <WorkButton onAsyncWork={refreshData} />
      <SimpleSnackbar
        open={message.open}
        onClose={handleCloseMessage}
        variant={message.variant}
        message={message.text}
      />
    </div>
  );
}

CameraList.propTypes = {
  url: PropTypes.string.isRequired,
  mobile: PropTypes.bool
};

CameraList.defaultProps = {
  url: "",
  mobile: false
};
