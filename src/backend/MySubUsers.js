import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreIcon from "@material-ui/icons/MoreVert";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AsyncFetch from "../utils/AsyncFetch";
import MyDeviceList from "./MyDeviceList";
import MyCameraList from "./MyCameraList";
import { ITEM_HEIGHT, usePrevious } from "../utils/utils";
import MessageDialog from "./MessageDialog.js";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    overflowX: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    maxWidth: 150,
    minWidth: 120
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  }
}));

const ModifyUserDialog = (props) => {
  const { username, classes, userinfo, open, onClose, onModify } = props;
  const [name, setName] = React.useState(userinfo.nick_name);
  const [endts, setEndts] = React.useState(userinfo.end_ts);
  const [selectedDevices, setSelectedDevices] = React.useState(
    makeSelectedDevice()
  );
  const [selectedCameras, setSelectedCameras] = React.useState(
    userinfo.cameras
  );

  function makeSelectedDevice() {
    const devices = [];
    userinfo.cameras.forEach((cam) => {
      if (devices.indexOf(cam.parent_id) === -1) {
        if (cam.parent_id.substr(10, 3) !== "111") {
          devices.push("00000000000000000000");
        } else {
          devices.push(cam.parent_id);
        }
      }
    });
    return devices;
  }

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    let v = event.target.value.trim();
    setName(v);
  };
  const handleDateChange = (event) => {
    console.log("Change end_ts:" + event.target.value);
    setEndts(event.target.value);
  };
  const handleDeviceChange = (selDevices) => {
    setSelectedDevices(selDevices);
  };
  const handleCameraChange = (selCameras) => {
    setSelectedCameras(selCameras);
  };

  const prevName = usePrevious(name);
  const prevEndts = usePrevious(endts);
  const prevCameras = usePrevious(selectedCameras);
  const handleModify = () => {
    if (
      prevName !== name ||
      prevEndts !== endts ||
      prevCameras !== selectedCameras
    ) {
      let params = { username: userinfo.username };
      if (prevName !== name) {
        params["nick_name"] = name;
      }
      if (prevEndts !== endts) {
        params["end_ts"] = endts;
      }
      if (prevCameras !== selectedCameras) {
        params["cameras"] = selectedCameras.map((cam) => cam.deviceid);
      }
      AsyncFetch("/sapling/modify_user", params, "POST")
        .then((response) => {
          params["cameras"] = selectedCameras;
          onModify(params);
          onClose();
        })
        .catch((error) => {
          console.log(error.name + error.message);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        修改用户:{userinfo.username}
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="modify-name">修改姓名</InputLabel>
          <Input
            id="modify-username"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="modify-end-ts">帐户终止日期</InputLabel>
          <Input
            id="register-end-ts"
            type="date"
            value={endts}
            onChange={handleDateChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parent-device-select">请选择父级设备</InputLabel>
          <MyDeviceList
            username={username}
            devices={selectedDevices}
            onSelectedChange={handleDeviceChange}
            update={0}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parent-device-select">请选择摄像头</InputLabel>
          <MyCameraList
            username={username}
            parentids={selectedDevices}
            cameras={selectedCameras}
            onSelectedChange={handleCameraChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          终止
        </Button>
        <Button onClick={handleModify} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UserQueryBar = (props) => {
  const {
    username,
    classes,
    onQuery,
    updateDevice,
    onQueryOverdue,
    onDeleteAll
  } = props;
  const [selDevice, setSelDevice] = React.useState("");
  const [likely, setLikely] = React.useState("");
  const [registerDevices, setRegisterDevices] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alertInfo, setAlertInfo] = React.useState({
    open: false,
    title: "",
    message: ""
  });
  const open = Boolean(anchorEl);
  const handleChange = (name) => (event) => {
    if (name === "device") {
      let v = event.target.value;
      setSelDevice(v);
      onQuery(v, likely);
    } else {
      let v = event.target.value.trim();
      setLikely(v);
    }
  };
  const handleQuery = () => {
    onQuery(selDevice, likely);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteAll = () => {
    setAnchorEl(null);
    setAlertInfo({
      open: true,
      title: "删除所有子用户",
      message: "真的要删除条件下的所有子用户?删除后将不可恢复!"
    });
  };

  const handleAlertOK = () => {
    onDeleteAll();
  };
  const handleQueryOverdue = () => {
    setAnchorEl(null);
    onQueryOverdue();
  };
  function genDeviceList() {
    return registerDevices.map((dev) => (
      <MenuItem value={dev.deviceid}>{dev.name}</MenuItem>
    ));
  }
  React.useEffect(() => {
    setRegisterDevices([]);
    if (username) {
      let qparams = { ts: Date.now() };
      AsyncFetch("/sapling/get_device", qparams)
        .then((response) => {
          let result = response.result;
          if (result !== 0) {
            console.log("result:" + result);
            return;
          }
          let devices = response.devices;
          devices.unshift({ deviceid: "", name: "所有设备" });
          setRegisterDevices(devices);
        })
        .catch((error) => {
          console.log(error.name + error.message);
        });
    }
  }, [updateDevice, username]);
  return (
    <Toolbar>
      <InputBase
        className={classes.input}
        value={likely}
        onChange={handleChange("likely")}
        placeholder="搜索用户名/姓名"
        inputProps={{ "aria-label": "search likely" }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        color="inherit"
        onClick={handleQuery}
      >
        <SearchIcon />
      </IconButton>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="device-select">
          选择设备
        </InputLabel>
        <Select
          className={classes.selectEmpty}
          value={selDevice}
          displayEmpty
          name="device"
          onChange={handleChange("device")}
          input={<Input id="device-select" />}
        >
          {genDeviceList()}
        </Select>
      </FormControl>
      <div className={classes.grow} />
      <IconButton
        className={classes.iconButton}
        aria-label="more"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleQueryOverdue}>所有过期用户</MenuItem>
        <MenuItem onClick={handleDeleteAll}>删除所有用户</MenuItem>
      </Menu>
      <MessageDialog
        open={alertInfo.open}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
        title={alertInfo.title}
        message={alertInfo.message}
        onOK={handleAlertOK}
      />
    </Toolbar>
  );
};

export default function MySubUsers(props) {
  const classes = useStyles();
  const { username, updateUser, updateDevice } = props;
  const [totalRows, setTotalRows] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsData, setRowsData] = React.useState([]);
  const [filter, setFilter] = React.useState({
    deviceid: "",
    likely: "",
    overdue: false,
    deleteAll: false
  });
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [alertInfo, setAlertInfo] = React.useState({
    open: false,
    title: "",
    message: "",
    index: -1
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCamsDetail = Boolean(anchorEl);

  const handleCamerasDetailClose = () => {
    setAnchorEl(null);
  };

  const handleCamerasDetailClick = (index, event) => {
    setCurrentIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrentIndex(-1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setCurrentIndex(-1);
  };

  const handleEditUser = (index, event) => {
    console.log("handleEditUser, index" + index);
    setCurrentIndex(index);
    setOpenEdit(true);
  };

  const handleAlertOK = () => {
    let cusers = [...rowsData];
    let userinfo = cusers[alertInfo.index];
    let qparams = { username: userinfo.username };
    AsyncFetch("/sapling/delete_user", qparams)
      .then((response) => {
        let result = response.result;
        if (result === 0) {
          cusers.splice(alertInfo.index, 1);
          setTotalRows((totalRows) => totalRows - 1);
          setCurrentIndex(-1);
          setRowsData(cusers);
        } else {
          console.log(
            "Delete username:" + userinfo.username + " failed, result:" + result
          );
        }
      })
      .catch((error) => {
        console.log("Delete username:" + userinfo.username + "failed!");
      });
  };

  const showAlert = (index, title, message) => {
    setAlertInfo({ open: true, title: title, message: message, index: index });
  };

  const handleDeleteUser = (index, event) => {
    showAlert(index, "删除子用户", "确实要删除吗？请注意，删除后将不能恢复！");
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const onQueryFilter = (deviceid, likely) => {
    setFilter({
      deviceid: deviceid,
      likely: likely,
      overdue: false,
      deleteAll: false
    });
    setPage(0);
  };

  const handleDeleteAll = () => {
    setFilter({ ...filter, deleteAll: true });
    setTotalRows(0);
    setPage(0);
    setRowsData([]);
  };

  const handleQueryOverdue = () => {
    setFilter({ ...filter, overdue: true });
    setPage(0);
  };

  function genCamerasOptions() {
    return (
      currentIndex >= 0 &&
      rowsData[currentIndex].cameras.map((cam) => (
        <MenuItem key={cam.deviceid}>{cam.name}</MenuItem>
      ))
    );
  }

  const handleUserChange = (cparams) => {
    let cusers = [...rowsData];
    let userinfo = cusers[currentIndex];
    if (cparams.hasOwnProperty("nick_name")) {
      userinfo.nick_name = cparams.nick_name;
    }
    if (cparams.hasOwnProperty("end_ts")) {
      userinfo.end_ts = cparams.end_ts;
    }
    if (cparams.hasOwnProperty("cameras")) {
      userinfo.cameras = cparams.cameras;
    }
    setRowsData(cusers);
  };

  React.useEffect(() => {
    if (username) {
      let qparams = {
        ...filter,
        current_page: page,
        rows_per_page: rowsPerPage
      };
      AsyncFetch("/sapling/get_subusers", qparams, "POST")
        .then((response) => {
          let result = response.result;
          if (result !== 0) {
            console.log("result:" + result);
            return;
          }
          if (response.hasOwnProperty("total_rows")) {
            setTotalRows(response.total_rows);
          }
          setRowsData(response.rows);
          setCurrentIndex(-1);
          if (filter.deleteAll) {
            filter.deleteAll = false;
          }
          if (filter.overdue) {
            filter.overdue = false;
          }
        })
        .catch((error) => {
          console.log(error.name + error.message);
        });
    } else {
      setTotalRows(0);
      setRowsData([]);
      setCurrentIndex(-1);
      if (filter.deleteAll) {
        filter.deleteAll = false;
      }
      if (filter.overdue) {
        filter.overdue = false;
      }
    }
  }, [username, page, rowsPerPage, filter, updateUser]);
  return (
    <Paper className={classes.root}>
      <UserQueryBar
        username={username}
        classes={classes}
        onQuery={onQueryFilter}
        updateDevice={updateDevice}
        onQueryOverdue={handleQueryOverdue}
        onDeleteAll={handleDeleteAll}
      />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="my userlist table">
          <TableHead>
            <TableRow>
              <StyledTableCell>操作</StyledTableCell>
              <StyledTableCell align="left">用户名</StyledTableCell>
              <StyledTableCell align="left">姓名</StyledTableCell>
              <StyledTableCell align="left">口令</StyledTableCell>
              <StyledTableCell align="left">帐户终止日期</StyledTableCell>
              <StyledTableCell align="left">摄像头</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row, index) => (
              <StyledTableRow hover key={row.username}>
                <StyledTableCell align="left">
                  <IconButton
                    aria-label="edit"
                    onClick={(event) => {
                      handleEditUser(index, event);
                    }}
                    className={classes.iconButton}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={(event) => {
                      handleDeleteUser(index, event);
                    }}
                    className={classes.iconButton}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="left">{row.nick_name}</StyledTableCell>
                <StyledTableCell align="left">{row.password}</StyledTableCell>
                <StyledTableCell aligdn="left">{row.end_ts}</StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    aria-label="cameras-detail"
                    aria-controls="cameras-detail-menu"
                    onClick={(event) => {
                      handleCamerasDetailClick(index, event);
                    }}
                    aria-haspopup="true"
                    className={classes.iconButton}
                    size="small"
                  >
                    <MoreIcon />
                  </IconButton>
                  <Menu
                    id="cameras-detail-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openCamsDetail}
                    onClose={handleCamerasDetailClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200
                      }
                    }}
                  >
                    {genCamerasOptions()}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        labelRowsPerPage="每页行数:"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {openEdit && (
        <ModifyUserDialog
          username={username}
          classes={classes}
          userinfo={rowsData[currentIndex]}
          open={openEdit}
          onClose={handleEditClose}
          onModify={handleUserChange}
        />
      )}

      <MessageDialog
        open={alertInfo.open}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
        title={alertInfo.title}
        message={alertInfo.message}
        onOK={handleAlertOK}
      />
    </Paper>
  );
}
