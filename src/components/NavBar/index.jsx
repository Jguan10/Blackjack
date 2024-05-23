import {Link, Outlet} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signedOut } from "../../store/loggedIn.js";
import {Button} from "@mui/material";

function Account() {
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  function signOut() {
    dispatch(signedOut());
  }
  if (auth)
    return (
      <div id="account">
        <Link to="/account">
          <Button variant="contained">Account</Button>
        </Link>
        <Button variant="contained" onClick={signOut}>Sign Out</Button>
      </div>
    );
}

export default function NavBar() {

  return (
    <>
      <div id="nav-bar">
        <div id="cgh">
            <Link to="/">
              <Button variant="contained">HOME</Button>
            </Link>
        </div>
        <Account />
      </div>
      <Outlet />
    </>
  );
}


