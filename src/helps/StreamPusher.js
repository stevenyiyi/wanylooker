import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden"
  }
});
export default function StreamPusher() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        RTSP 推流, 请注意，rtsp 推流的顺序为：ANNOUCE-->SETUP-->RECORD,
        详情请见rfc2326.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        RTMP 推流,详情请见RTMP 协议。
      </Typography>
      <Typography variant="body1" gutterBottom>
        推流端--nebula--app service三者间的时序图如下：
      </Typography>
      <img
        className={classes.img}
        src="/imgs/stream_pusher.png"
        alt="SIP REGISTER 交互图"
      />
    </Paper>
  );
}
