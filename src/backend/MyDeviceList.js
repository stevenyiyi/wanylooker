import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MenuProps, usePrevious } from "../utils/utils";
import AsyncFetch from "../utils/AsyncFetch";

function getStyles(key, multiselected, theme) {
  return {
    fontWeight:
      multiselected.indexOf(key) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MyDeviceList(props) {
  const theme = useTheme();
  const { username, menuProps, devices, onSelectedChange, update } = props;
  const [registerDevices, setRegisterDevices] = React.useState([]);
  const [selectedDevices, setSelectedDevices] = React.useState(devices.slice());
  const prevSelDevices = usePrevious(selectedDevices);

  const handleRegisterDevicesChange = event => {
    setSelectedDevices(event.target.value);
  };

  const handleOnBlur = () => {
    console.log("MyDeviceList handleOnBlur");
    if (prevSelDevices !== selectedDevices) {
      console.log("MyDeviceList handleOnBlur change");
      onSelectedChange(selectedDevices);
    }
  };

  React.useEffect(() => {
    if (username) {
      setRegisterDevices([]);
      let qparams = { type: 111, ts: Date.now() };
      AsyncFetch("/sapling/get_device", qparams)
        .then(response => {
          let result = response.result;
          if (result !== 0) {
            console.log("result:" + result);
            return;
          }
          let devices = response.devices;
          devices.push({
            deviceid: "00000000000000000000",
            name: "所有子设备"
          });
          setRegisterDevices(devices);
        })
        .catch(error => {
          console.log(error.name + error.message);
        });
    }
  }, [update, username]);

  function genRegisterDevices() {
    return (
      registerDevices &&
      registerDevices.map(dev => (
        <MenuItem
          key={dev.deviceid}
          value={dev.deviceid}
          style={getStyles(dev.deviceid, selectedDevices, theme)}
        >
          {dev.name}
        </MenuItem>
      ))
    );
  }
  return (
    <Select
      multiple
      value={selectedDevices}
      onChange={handleRegisterDevicesChange}
      onBlur={handleOnBlur}
      input={<Input />}
      inputProps={{
        name: "registerDevices",
        id: "my-device-select"
      }}
      MenuProps={menuProps}
    >
      {genRegisterDevices()}
    </Select>
  );
}

MyDeviceList.propTypes = {
  username: PropTypes.string,
  menuProps: PropTypes.object,
  devices: PropTypes.array,
  onSelectedChange: PropTypes.func.isRequired,
  update: PropTypes.number.isRequired
};

MyDeviceList.defaultProps = {
  username: "",
  menuProps: MenuProps,
  devices: [],
  onSelectedChange: cams => {},
  update: 0
};
