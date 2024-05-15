import {useEffect, useMemo, useState} from "react";
import "./Home.css"
import SocketConnection from "../../socket.js";
import {Alert, Button, Dialog, DialogTitle, FormControl, Snackbar, TextField} from "@mui/material";
import PropTypes from "prop-types";

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
    if (e.target.validity.valid) {
    }
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

export default function Home() {
  const [open, setOpen] = useState(false);

  function closeSignupDialog() {
    setOpen(false);
  }
  function openSignUpDialog() {
    setOpen(true);
  }

  const abort = new AbortController();
  useEffect(() => {
    const socket = new SocketConnection();
    fetch("http://localhost:3000/", { signal: abort.signal })
      .then(async (data) => console.log(await data.json()))
    return () => {
        abort.abort("Component deloaded");
        socket.removeConnectListener();
    };
  }, []);
  return (
    <>
      <div id="welcome">
        <h1>
            Welcome! Please log in to game!
        </h1>
      </div>
      <div id="buttons">
        <button>Log in!</button>
        <button onClick={openSignUpDialog}>Sign up!</button>
      </div>
      <SignUpDialog
        open={open}
        onClose={closeSignupDialog}
      />
    </>
  );
}