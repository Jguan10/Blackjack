import {Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";
import "./Account.css";
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [username, setUsername] = useState("");
  const [created, setCreated] = useState("");
  const [roomsJoined, setRoomsJoined] = useState("");
  const [roundsPlayed, setRoundsPlayed] = useState("");
  const [roundsWon, setRoundsWon] = useState("");
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);
  fetch("http://localhost:3000/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.payload
    }),
  }).then(async (res) => {
    const data = await res.json();
    if (data === "Email is empty...") {
      navigate("/");
      return;
    }
    setUsername(data.name);
    setCreated(data.created);
    setRoomsJoined(data.roomsJoined);
    setRoundsPlayed(data.roundsPlayed);
    setRoundsWon(data.roundsWon);
  })

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>{ username }</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Account Created</TableCell>
            <TableCell>{new Date(created).toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rooms Joined</TableCell>
            <TableCell>{roomsJoined}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rounds Played</TableCell>
            <TableCell>{roundsPlayed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rounds Won</TableCell>
            <TableCell>{roundsWon}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}