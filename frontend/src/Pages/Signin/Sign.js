import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import useStyle from "./Style";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import getMe from "../../Store/Thunk/getMe";
import error from "../../Utilites/error";
function SignIn() {
  const classes = useStyle();
  const [ErrorMail, setErrorMail] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  // Sign In
  const signInHandler = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/login", {
        email: Mail,
        password: Password,
      });
      await dispatch(getMe());
      history.push("/");
    } catch (err) {
      error(err, setLoading);
    }
    setLoading(false);
  };
  // Make the Button Disabled
  const isDisabled =
    ErrorMail || ErrorPassword || Mail.length === 0 || Password.length === 0;

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

  return (
    <Grid container direction="column" className={classes.card}>
      <Typography variant="h4" className={classes.signWord}>
        Sign in
      </Typography>

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
        placeholder="Enter password"
        type="password"
        className={
          ErrorPassword ? `${classes.input} ${classes.error}` : classes.input
        }
        onChange={HandlePassword}
      ></input>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={isDisabled}
          className={classes.Button}
          onClick={signInHandler}
        >
          {loading ? (
            <CircularProgress
              style={{ color: "white", width: "2rem", height: "2rem" }}
            />
          ) : (
            "sign in"
          )}
        </Button>
      </Grid>
      <Typography variant="body1">
        New Customer?{" "}
        <Link to="/signup" className={classes.Sign}>
          Register
        </Link>
      </Typography>
    </Grid>
  );
}

export default SignIn;
