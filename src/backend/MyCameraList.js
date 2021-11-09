import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MenuProps, usePrevious } from "../utils/utils";
import AsyncFetch from "../utils/AsyncFetch";

export default function MyCameraList(props) {
  const theme = useTheme();
  const { username, menuProps, parentids, cameras, onSelectedChange } = props;
  const [myCameras, setMyCameras] = React.useState();
  const [selCameras, setSelCameras] = React.useState(makeSelectedCameras());
  const prevSelCameras = usePrevious(selCameras);

  function getStyles(key, multiselected, theme) {
    return {
      fontWeight:
        multiselected.indexOf(key) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }
  function makeSelectedCameras() {
    const selcams = [];
    cameras.forEach(cam => {
      selcams.push(cam.deviceid);
    });
    return selcams;
  }
  const handleSelectedCamerasChange = event => {
    setSelCameras(event.target.value);
  };

  const handleOnBlur = () => {
    console.log("MyCameraList handleOnBlur");
    if (prevSelCameras !== selCameras) {
      //通知选择的 camera对象数组
      const selcams = [];
      selCameras.forEach(element => {
        myCameras.forEach(cam => {
          if (cam.deviceid === element) {
            selcams.push(cam);
          }
        });
      });
      onSelectedChange(selcams);
    }
  };

  function genMyCameras() {
    return (
      myCameras &&
      myCameras.map(dev => (
        <MenuItem
          key={dev.deviceid}
          value={dev.deviceid}
          style={getStyles(dev.deviceid, selCameras, theme)}
        >
          {dev.name}
        </MenuItem>
      ))
    );
  }

  React.useEffect(() => {
    if (username) {
      console.log("pull cameras from server!");
      AsyncFetch("/sapling/get_device", parentids, "POST")
        .then(response => {
          let result = response.result;
          if (result !== 0) {
            console.log("result:" + result);
            return;
          }
          setMyCameras(response.devices);
        })
        .catch(error => {
          console.log("网络出了点问题!");
        });
    }
  }, [parentids, username]);

  return (
    <Select
      multiple
      value={selCameras}
      onChange={handleSelectedCamerasChange}
      onBlur={handleOnBlur}
      input={<Input />}
      inputProps={{
        name: "myCameras",
        id: "my-device-select"
      }}
      MenuProps={menuProps}
    >
      {genMyCameras()}
    </Select>
  );
}

MyCameraList.propTypes = {
  username: PropTypes.string,
  menuProps: PropTypes.object,
  parentids: PropTypes.array,
  cameras: PropTypes.array,
  onSelectedChange: PropTypes.func.isRequired
};

MyCameraList.defaultProps = {
  username: "",
  menuProps: MenuProps,
  parentids: [],
  cameras: [],
  onSelectedChange: cams => {}
};
