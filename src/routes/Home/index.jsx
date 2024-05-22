import { useState} from "react";
import "./Home.css"
import { Button, Dialog, DialogTitle, Grid, Snackbar, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { loggedIn, signedOut } from "../../store/loggedIn.js";
import {Link} from "react-router-dom";

function SignUpDialog(props) {
  const [openSnackbar, setSnackbar] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function closeSnackbar() {
    setSnackbar(false);
  }
  function updateEmail(e) {
    setEmail(e.target.value)
  }
  function updateUsername(e) {
    setUsername(e.target.value);
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }
  function updateConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }
  async function register() {
    // Simple form validation
    if (!email || !username || !password || !confirmPassword) {
      setSnackbarMessage("There are empty fields...");
      setSnackbar(true);
      return;
    }
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbar(true);
      return;
    }
    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    }).then(async (res) => {
      const response = await res.json()
      setSnackbarMessage(response);
      if (response === "User created!")
        props.onClose();
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSnackbar(true);
    });
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <TextField name="email" placeholder="Email" type="email" autoFocus required value={email} onChange={updateEmail} />
        <TextField name="username" placeholder="Username" value={username} onChange={updateUsername} />
        <TextField name="password" placeholder="Password" type="password" value={password} onChange={updatePassword} />
        <TextField name="confirmedPassword" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={updateConfirmPassword} />
        <Button onClick={register}>Register</Button>
      </Dialog>
      <Snackbar open={openSnackbar} anchorOrigin={{vertical: "bottom", horizontal: "center"}} onClose={closeSnackbar}
                message={snackbarMessage} severity={signUpStatus} />
    </>
  )
}

SignUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

function LoginDialog(props) {
  const [openSnackbar, setSnackbar] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function closeSnackbar() {
    setSnackbar(false);
  }
  function updateEmail(e) {
    setEmail(e.target.value)
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }
  async function login() {
    // Simple form validation
    if (!email || !password) {
      setSnackbarMessage("There are empty fields...");
      setSnackbar(true);
      return;
    }
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(async (res) => {
      const response = await res.json()
      setSnackbarMessage(response);
      if (response === "Logged In!") {
        dispatch(loggedIn(email, password));
        props.onClose();
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSnackbar(true);
    });
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Login</DialogTitle>
        <TextField name="email" placeholder="Email" type="email" autoFocus required value={email} onChange={updateEmail} />
        <TextField name="password" placeholder="Password" type="password" value={password} onChange={updatePassword} />
        <Button onClick={login}>Login</Button>
      </Dialog>
      <Snackbar open={openSnackbar} anchorOrigin={{vertical: "bottom", horizontal: "center"}} onClose={closeSnackbar}
                message={snackbarMessage} severity={loginStatus} />
    </>
  )
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default function Home() {
  const auth = useSelector((state) => state.auth.value);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  function closeSignupDialog() {
    setSignUpOpen(false);
  }
  function openSignUpDialog() {
    setSignUpOpen(true);
  }
  function closeLoginDialog() {
    setLoginOpen(false);
  }
  function openLoginDialog() {
    setLoginOpen(true);
  }

  if (!auth)
    return (
      <div id="welcome">
        <h1>
          Welcome! Please log in to game!
        </h1>
        <Grid className="container" container spacing={1}>
          <Grid item>
            <Button variant="contained" onClick={openLoginDialog} >Log in!</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={openSignUpDialog}>Sign up!</Button>
          </Grid>
        </Grid>
        <SignUpDialog
          open={signUpOpen}
          onClose={closeSignupDialog}
        />
        <LoginDialog
          open={loginOpen}
          onClose={closeLoginDialog}
        />
      </div>
    );
  return (
    <div className="container">
      <Link to="/play">
        <Button variant="contained">Play The Game</Button>
      </Link>
    </div>
  );
}