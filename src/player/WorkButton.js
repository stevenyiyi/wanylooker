import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';
const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    bottom:theme.spacing(1),
    right:theme.spacing(1),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));

export default function WorkButton(props) {
  const classes = useStyles();
  const {onAsyncWork} = props;
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    console.log("WorkButton useEffect called!");
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      onAsyncWork && onAsyncWork();
      timer.current = setTimeout(() => {
         setSuccess(true);
         setLoading(false);
      }, 4000);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Fab
        aria-label="work-fab"
        color="primary"
        className={buttonClassname}
        onClick={handleButtonClick}
      >
        <RefreshIcon />
      </Fab>
      {loading && <CircularProgress size={68} className={classes.fabProgress} />}
    </div>
  );
}

WorkButton.propTypes = {
  onAsyncWork: PropTypes.func,
};