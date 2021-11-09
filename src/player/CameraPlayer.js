import Hls from "hls.js";
import React from "react";
import PropTypes from "prop-types";
export default class CameraPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: Date.now()
    };
    this.supportMSE = Hls.isSupported();
    this.hls = null;
    console.log("CameraPlayer constuctor!");
  }

  _initPlayer() {
    let { video: $video } = this.refs;
    let { url, hlsConfig, onError, onSuccess } = this.props;
    if (!url) return;

    if (this.hls) {
      this.hls.stopLoad();
      this.hls.detachMedia();
      this.hls.destroy();
    }
    $video.src = "";
    if (this.supportMSE) {
      let hls = new Hls(hlsConfig);
      hls.component = this;
      hls.loadSource(url);
      hls.attachMedia($video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        var playPromise = $video.play();
        if (playPromise) {
          playPromise.catch(function (error) {
            if (error.name === "NotAllowedError") {
              $video.muted = true;
              $video.play();
            }
          });
        }
        onSuccess && onSuccess(url);
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            console.log("fatal media error encountered, try to recover");
            hls.recoverMediaError();
          } else {
            $video.pause();
            hls.stopLoad();
            hls.detachMedia();
            onError && onError(data);
          }
        }
      });
      this.hls = hls;
    } else if ($video.canPlayType("application/vnd.apple.mpegurl")) {
      // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
      // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
      // This is using the built-in support of the plain video element, without using hls.js.
      // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
      // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
      console.log("Browser not support mse, but can play m3u8!");
      if ($video.networkState === $video.NETWORK_LOADING) {
        $video.pause();
      }
      $video.src = url;
      $video.load();
      $video.addEventListener("canplaythrough", function () {
        $video.play();
      });
      $video.addEventListener("play", () => {
        onSuccess && onSuccess(url);
      });
      $video.addEventListener(
        "error",
        () => {
          let err = $video.error;
          if ($video.networkState === $video.NETWORK_LOADING) {
            $video.pause();
            $video.src = ""; // empty source
            $video.load();
          }
          onError && onError(err);
        },
        true
      );
    } else {
      let err = new MediaError();
      err.code = MediaError.MEDIA_ERR_DECODE;
      err.message = "浏览器不支持,请安装较新版本的浏览器!";
      onError && onError(err);
    }
  }

  componentDidMount() {
    console.log("CameraPlayer componentDidMount!");
    this._initPlayer();
  }

  componentDidUpdate(prevProps) {
    console.log(
      "CameraPlayer componentDidUpdate, url:(" +
        prevProps.url +
        "-->" +
        this.props.url +
        "),width:(" +
        prevProps.width +
        "-->" +
        this.props.width +
        "),height:(" +
        prevProps.height +
        "-->" +
        this.props.height +
        ")"
    );
    if (prevProps.url !== this.props.url) {
      this._initPlayer();
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount!");
    let { hls } = this;
    if (hls) {
      hls.destroy();
    }
  }
  render() {
    let { playerId } = this.state;
    const { controls, width, height, poster, videoProps } = this.props;

    return (
      <div key={playerId} className="player-area">
        <video
          ref="video"
          className="hls-player"
          id={`react-hls-${playerId}`}
          width={width}
          hieght={height}
          controls={controls}
          crossOrigin={"use-credentials"}
          poster={poster}
          preload="auto"
          autoplay
          playsinline
          {...videoProps}
        />
      </div>
    );
  }
}

CameraPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  hlsConfig: PropTypes.object, //https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
  controls: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  poster: PropTypes.string,
  videoProps: PropTypes.object,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  refreshId: PropTypes.number
};

CameraPlayer.defaultProps = {
  url: "",
  autoplay: false,
  hlsConfig: {},
  controls: true,
  width: 888,
  height: 500,
  poster: "",
  videoProps: {},
  onError: (data) => {
    return;
  },
  onSuccess: (url) => {
    return;
  },
  refreshId: 0
};
