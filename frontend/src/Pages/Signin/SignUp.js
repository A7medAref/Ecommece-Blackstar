import { Button, Grid, Typography } from "@material-ui/core";
import useStyle from "./Style";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import getMe from "../../Store/Thunk/getMe";
import error from "../../Utilites/error";

function SignUp() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [ErrorName, setErrorName] = useState(false);
  const [ErrorMail, setErrorMail] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [ErrorConfirm, setErrorConfirm] = useState(false);

  const [Name, setName] = useState("");
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const history = useHistory();
  // Make the Button Disabled
  const isDisabled =
    ErrorName ||
    ErrorMail ||
    ErrorPassword ||
    ErrorConfirm ||
    Name.length === 0 ||
    Mail.length === 0 ||
    Password.length === 0 ||
    Confirm.length === 0;

  const HandleSignUp = async () => {
    try {
      await axios.post("/api/v1/auth/signup", {
        name: Name,
        email: Mail,
        password: Password,
      });
      await dispatch(getMe());
      history.push("/");
    } catch (err) {
      error(err);
    }
  };

  // Handling Errors of the Fields
  const HandleMail = (e) => {
    setMail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) setErrorMail(true);
    else setErrorMail(false);
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

  const HandleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2) setErrorName(true);
    else setErrorName(false);
  };
  ///////////////////////////////////////////////////
  return (
    <Grid container direction="column" className={classes.card}>
      <Typography variant="h4" className={classes.signWord}>
        Sign Up
      </Typography>

      <Typography variant="body2">Name</Typography>
      <input
        placeholder="Enter name"
        className={
          ErrorName ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandleName}
      ></input>

      <Typography variant="body2">Email Address</Typography>
      <input
        placeholder="Enter email"
        className={
          ErrorMail ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandleMail}
      ></input>

      <Typography variant="body2">Password</Typography>
      <input
        type="password"
        placeholder="Enter password"
        className={
          ErrorPassword ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandlePassword}
      ></input>

      <Typography variant="body2">Confirm Password</Typography>
      <input
        type="password"
        placeholder="Confirm password"
        className={
          ErrorConfirm ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandleConfirm}
      ></input>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={HandleSignUp}
          className={classes.Button}
          disabled={isDisabled}
        >
          Register
        </Button>
      </Grid>
      <Typography variant="body1">
        Have an account ?{" "}
        <Link to="/signin" className={classes.Sign}>
          Login
        </Link>
      </Typography>
    </Grid>
  );
}

export default SignUp;
