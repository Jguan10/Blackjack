import {useEffect, useState} from "react";
import "./Home.css"
import SocketConnection from "../../socket.js";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {Form} from "react-router-dom";

function SignUpDialog(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      console.log(await res.json());
    })
  }
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <form onSubmit={register}>
        <TextField name="email" placeholder="Email" type="email" autoFocus required value={email} onChange={updateEmail} />
        <TextField name="username" placeholder="Username" required value={username} onChange={updateUsername} />
        <TextField name="password" placeholder="Password" type="password" required value={password} onChange={updatePassword} />
        <TextField name="confirmedPassword" placeholder="Confirm Password" type="password" required value={confirmPassword} onChange={updateConfirmPassword} />
        <Button onClick={register}>Register</Button>
      </form>
    </Dialog>
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