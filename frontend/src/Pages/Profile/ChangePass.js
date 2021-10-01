import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import useStyle from "./ProfileStyle";
import { useState } from "react";
import axios from "axios";
import error from "../../Utilites/error";

function ChangePass() {
  const classes = useStyle();
  const [ErrorCurrent, setErrorCurrent] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [ErrorConfirm, setErrorConfirm] = useState(false);

  const [current, setCurrent] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  // Make the Button Disabled
  const isDisabled =
    ErrorCurrent ||
    ErrorPassword ||
    ErrorConfirm ||
    current.length === 0 ||
    Password.length === 0 ||
    Confirm.length === 0;

  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/v1/auth/changepassword", {
        currentPassword: current,
        newPassword: Password,
      });
      setPassword("");
      setConfirm("");
      setCurrent("");
    } catch (err) {
      error(err, setLoading);
    }
    setLoading(false);
  };

  const HandleCurrent = (e) => {
    setCurrent(e.target.value);
    if (e.target.value.length < 8) setErrorCurrent(true);
    else setErrorCurrent(false);
  };

  const HandlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) setErrorPassword(true);
    else setErrorPassword(false);
  };

  const HandleConfirm = (e) => {
    setConfirm(e.target.value);
    if (e.target.value !== Password) setErrorConfirm(true);
    else setErrorConfirm(false);
  };

  ///////////////////////////////////////////////////
  return (
    <Grid container direction="column" style={{ marginTop: "2rem" }}>
      <Typography variant="body2">Current Password</Typography>
      <input
        type="password"
        placeholder="Enter current password"
        value={current}
        className={
          ErrorCurrent ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandleCurrent}
      ></input>

      <Typography variant="body2">New Password</Typography>
      <input
        type="password"
        placeholder="Enter new password"
        className={
          ErrorPassword ? `${classes.input} ${classes.error}` : classes.input
        }
        value={Password}
        onChange={HandlePassword}
      ></input>

      <Typography variant="body2">Confirm New Password</Typography>
      <input
        type="password"
        placeholder="Confirm new password"
        className={
          ErrorConfirm ? `${classes.input} ${classes.error}` : classes.input
        }
        value={Confirm}
        onChange={HandleConfirm}
      ></input>

      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.Button}
          disabled={isDisabled}
          onClick={changePassword}
        >
          {loading ? (
            <CircularProgress
              style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
            />
          ) : (
            "change password"
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

export default ChangePass;
