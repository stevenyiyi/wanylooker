import React from "react";
import sha1 from "js-sha1";
// Menu props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

function supportsMediaSource() {
  let hasWebKit = "WebKitMediaSource" in window;
  let hasMediaSource = "MediaSource" in window;

  return hasWebKit || hasMediaSource;
}

function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

function calcToken(username, password, path) {
  let h1 = sha1(username + ":" + password);
  let h2 = sha1(password + ":" + path);
  let h3 = sha1(username + ":" + password + ":" + path);
  let token = sha1(h1 + ":" + h2 + ":" + h3);
  return token;
}

function genPlayUri(oid) {
  let uri = "/live/" + oid + "_master.m3u8";
  return uri;
}

function fixCameraList(camlist) {
  //camlist
  let playuri = "";
  if (camlist.cameras) {
    let dcams = camlist.cameras.map(cam => {
      if (cam.status === 1 && !playuri) {
        cam["selected"] = true;
        playuri = genPlayUri(cam.oid);
      } else {
        cam["selected"] = false;
      }
      return cam;
    });
    camlist.cameras = dcams;
  }
  if (camlist.groups) {
    let cgroups = camlist.groups.map(group => {
      group.cameras.forEach((cam, index, theArray) => {
        if (cam.status === 1 && !playuri) {
          theArray[index].selected = true;
          playuri = genPlayUri(cam.oid);
        } else {
          theArray[index].selected = false;
        }
      });
      return { ...group, unfold: true };
    });
    camlist.groups = cgroups;
  }
  return playuri;
}
export {
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  MenuProps,
  supportsMediaSource,
  randomString,
  calcToken,
  genPlayUri,
  fixCameraList,
  usePrevious
};
