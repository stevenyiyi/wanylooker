import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  /* ~~ 脚注 ~~ */
  footer: {
    margin: "auto",
    textAlign: "center",
    paddingLeft: theme.spacing(2),
    backgroundColor: "#eeeeee"
  },
  ficon: {
    float: "left"
  },
  fa: {
    display: "inline-block",
    textDecoration: "none",
    height: "20px",
    lineHeight: "20px"
  },
  fp: {
    float: "left",
    height: "20px",
    lineHeight: "20px",
    margin: "0px 0px 0px 5px",
    color: "#939393"
  }
}));
export default function Readme() {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.content}>
        <Typography variant="subtitle1" gutterBottom>
          重庆小软网络科技是一家专门从事流媒本直播技术研发的公司，我们在流媒体领域有着丰富的研发经验，我们主要的产品有：
        </Typography>
        <Typography variant="body1" gutterBottom>
          1.nebula 流媒体直播云服务端软件。
        </Typography>
        <Typography variant="body1" gutterBottom>
          2.anysee 手机直播推流/播放sdk及软件。
        </Typography>
        <Typography variant="body1" gutterBottom>
          3.anyIPC 手机端gb28181 sdk及软件。
        </Typography>
        <Typography variant="body1" gutterBottom>
          4.webanysee HTML5 直播观看端。
        </Typography>
        <Typography variant="body1" gutterBottom>
          5.nebula app service 业务服务端。
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          我们同时提供各种流媒体直播解决方案，欢迎广大企业/客户与我们进行业务合作。
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          联系方式：成先生 手机：18996334689 13452128106 QQ:104037806
          微信：见手机号。
        </Typography>
      </div>
      <div className={classes.footer}>
        <h3>重庆小软网络科技有限公司</h3>
        <a className={classes.fa} href="https://beian.miit.gov.cn">
          <p className={classes.fp}>备案号:渝ICP备14003230号-2</p>
        </a>
        <a className={classes.fa} href="https://beian.miit.gov.cn">
          <p className={classes.fp}>备案号:渝ICP备14003230号-4</p>
        </a>
        <a
          className={classes.fa}
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50019002500468"
        >
          <img
            className={classes.ficon}
            src="imgs/备案图标.png"
            alt="beian_icon"
          />
          <p className={classes.fp}>渝公网安备 50019002500468号</p>
        </a>
        <a
          className={classes.fa}
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50019002503009"
        >
          <img
            className={classes.ficon}
            src="imgs/备案图标.png"
            alt="beian_icon"
          />
          <p className={classes.fp}>渝公网安备 50019002503009号</p>
        </a>
      </div>
    </Paper>
  );
}
