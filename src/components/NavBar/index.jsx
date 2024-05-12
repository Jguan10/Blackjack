import {Link, Outlet} from "react-router-dom";

export default function NavBar() {
    return (
      <>
        <div id="nav-bar">
            <div id="cgh"> 
                <Link to="/">CGH</Link>
            </div>
            <div id="account">
                <h1>Account</h1>
            </div>
        </div>
        <Outlet />
      </>
    );
}


