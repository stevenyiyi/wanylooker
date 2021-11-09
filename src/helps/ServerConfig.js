import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden"
  }
});

export default function ServerConfig() {
  const classes = useStyles();
  const [xsd, setXsd] = React.useState("");
  React.useEffect(() => {
    let req = new Request("/xsd/server_config.xsd");
    fetch(req).then(response => {
      return response.text().then(function(text) {
        setXsd(text);
      });
    });
  }, []);
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        nebula服务器配置
      </Typography>
      <Typography variant="body1" gutterBottom>
        配置文件为xml格式，存放位置在nebula的当前目录下，文件名：server_config.xml。
      </Typography>
      <Typography variant="body1" gutterBottom>
        导出配置文件，运行：./nebula -e，会在当前目录保存
        server_config.xml，然后可以修改配置文件。
      </Typography>
      <Typography variant="body1" gutterBottom>
        重新加载配置文件，运行：./nebula -s reload 。
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        配置文件XSD如下：
      </Typography>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="xsd-textarea"
        value={xsd}
        rowsMax={20}
        placeholder="Empty"
      />
      <Typography variant="subtitle1" gutterBottom>
        配置文件XSD图示如下：
      </Typography>
      <img
        className={classes.img}
        src="/imgs/server_config.png"
        alt="nebula 配置文件shcema图表"
      />
    </div>
  );
}
