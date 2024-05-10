import axios from "axios";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import "./Home.css"

export default function Home() {
    const source = axios.CancelToken.source();

    useEffect(() => {
        
        axios.get("http://localhost:3000/", { cancelToken: source.token }) 
            .then(data => console.log(data))
        return () => {source.cancel();};
    }, []);
        
    
    return (
        <>
            <NavBar />
            <div id="welcome">
                <h1>
                    Welcome! Please log in to game!
                </h1>
            </div>
            <div id="buttons">
                <button>Log in!</button>
                <button>Sign up!</button>
            </div>
        </>);
}