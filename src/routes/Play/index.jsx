import table from "../../assets/table.jpg";
import "./Play.css";
import {Button, Card, CardContent, Dialog, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setId } from "../../store/deckId.js";

const cardValues = {
  "A": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 10,
  "QUEEN": 10,
  "KING": 10,
  "ACE": 11
}

function Game(props) {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerValue, setPlayerValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);
  const [gameState, setGameState] = useState("");
  const [finish, setFinish] = useState(false);
  const navigate = useNavigate();

  const deckId = useSelector((state) => state.deckId.value);
  const email = useSelector((state) => state.auth.email);

  function addCardToPlayerHand(card) {
    if (playerValue + cardValues[card.value] > 21)
      for (const card of playerHand)
        if (card.value === "ACE") {
          card.value = "A";
          setPlayerValue((val) => val - 10);
          break;
        }
    if (playerValue + cardValues[card.value] > 21 && card.value === "ACE") {
      setPlayerValue((val) => val + 1);
      card.value = "A";
    }
    setPlayerHand((hand) => [...hand, card]);
    setPlayerValue((val) => val + cardValues[card.value])
  }
  function addCardToDealerHand(card) {
    setDealerHand((hand) => [...hand, card]);
    setDealerValue((val) => val + cardValues[card.value]);
  }
  useEffect( () =>  {
    async function setup() {
      setPlayerHand([]);
      setDealerHand([]);
      setPlayerValue(0);
      setDealerValue(0);
      if (deckId.payload) {
        await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId.payload}/draw/?count=2`).then(async (res) => {
          const data = await res.json();
          for (const card of data.cards)
            addCardToPlayerHand(card);
        });
        await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId.payload}/draw/?count=2`).then(async (res) => {
          const data = await res.json();
          for (const card of data.cards)
            addCardToDealerHand(card);
        });
      }
    }
    setup();
    return () => {

    }
  }, [deckId]);

  useEffect(() => {
    if (playerValue >= 21) {
      setFinish(true);
      determineGameState();
      setPlayerValue(0);
    }
  }, [playerValue]);


  async function hit() {
    await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId.payload}/draw/?count=1`).then(async (res) => {
      const data = await res.json();
      for (const card of data.cards) {
        addCardToPlayerHand(card);
      }
    });
  }

  function determineGameState() {
    if (playerValue > 21) {
      setGameState("Defeat");
    } else if (playerValue === dealerValue) {
      setGameState("Tie")
    } else if (playerValue > dealerValue) {
      setGameState("Victory!");
      fetch("http://localhost:3000/addWin", {
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
      });
    } else {
      setGameState("Defeat");
    }
  }

  return (
    <>
      <div className="dealer hand">
        { dealerHand.map((card, i) =>
          (i === 0 && !finish) ? <img className="card" key={card.code} src="https://www.deckofcardsapi.com/static/img/back.png" /> :  <img className="card" key={card.code} src={card.image}/>)
        }
      </div>
      <div className="current-player hand">
        { playerHand.map((card) => <img className="card" key={card.code} src={card.image} />)}
      </div>
      <div className="play-buttons">
        <Button variant="contained" onClick={() => hit()}>Hit</Button>
        <Button variant="contained" onClick={() => { setFinish(true); determineGameState() } } >Stand</Button>
      </div>
      <Dialog open={finish}>
        <Card sx={{ minWidth: 500, minHeight: 500}}>
          <CardContent>
            <Typography variant="h2">{ gameState }</Typography>
            <Grid container className="buttons">
              <Grid item>
                <Button variant="contained" onClick={() => {setFinish(false); props.openFn()} }>Next</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Dialog>
    </>
  )
}

Game.propTypes = {
  openFn: PropTypes.func.isRequired
}

function PlayDialog(props) {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState(0);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  async function play() {
    fetch("http://localhost:3000/addRound", {
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
    });

    await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(async (res) => {
      const data = await res.json();
      if (!data.success)
        console.log("uh oh");
      dispatch(setId(data.deck_id));
    }).catch(err => {
      console.err(err);
    });
    props.close();
    setRounds((currRound) => currRound + 1);
  }

  return (
    <Dialog open={props.open}>
      <Card sx={{ minWidth: 500, minHeight: 500}}>
        <CardContent>
          <Typography variant="h2">Blackjack Lobby</Typography>
          <Typography>Rounds Played: { rounds }</Typography>
          <Grid container spacing={2} className="buttons">
            <Grid item>
              <Link to="/">
                <Button variant="contained">Go Back Home</Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={play}>Play</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
}

PlayDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default function Play() {
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [game, setGame] = useState(false);
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  });

  const email = useSelector((state) => state.auth.email);
  fetch("http://localhost:3000/addJoin", {
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
  });

  function closeDialog() {
    setOpen(false);
    setGame(true);
  }

  function openDialog() {
    setOpen(true);
  }

  return(
    <>
      <img src={table} className="table" />
      <PlayDialog open={open} close={closeDialog} />
      { game ? <Game openFn={openDialog} /> : null }
    </>
  );
}