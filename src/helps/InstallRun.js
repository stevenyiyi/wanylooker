import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

export default function InstallRun() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        1.nebula服务器下载
      </Typography>
      <Typography variant="body1" gutterBottom>
        在主页 “下载” 中根据操作系统下载软件
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2.运行及参数说明：
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula 运行服务器
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula -e 导出配置文件server_config.xml
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula -s relaod 重新加载配置文件server_config.xml
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula -s quit 退出
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula -v 查看版本号
      </Typography>
      <Typography variant="body1" gutterBottom>
        ./nebula -? 查看帮助参数
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        3.日志说明：
      </Typography>
      <Typography variant="body1" gutterBottom>
        nebula的日志分为5个级别，从高到低为：error->warn->info->verbose->debug,其中error和warn无选择的记录，其它在个级别的日志可选择性记录，请在server_config.xml配置文件中激活。
      </Typography>
      <Typography variant="body1" gutterBottom>
        当nebula运行时，会在当前目录下产生日志文件，日志文件名：nebula.log。默认情况下：当日志文件超过2M时，会将日志备份。备份文件超过3个时会删除更前的日志文件。有关日志文件的配置，请在配置文件server_config.xml配置。
      </Typography>
    </div>
  );
}
