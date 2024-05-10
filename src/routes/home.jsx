import axios from "axios";
import { useEffect } from "react";

export default function Home() {
    const source = axios.CancelToken.source();

    useEffect(() => {
        
        axios.get("http://localhost:3000/", { cancelToken: source.token }) 
            .then(data => console.log(data))
        return () => {source.cancel();};
    }, []);
        
    
    return (<h1>
            dick and balls
        </h1>);
}