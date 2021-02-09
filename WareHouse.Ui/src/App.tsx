import React, {useEffect, useState} from "react";
import { LoginComponent } from "./Components/LoginComponent";
import LandingPage from "./Components/LandingPageComponent";
import {IsAuthenticated} from "./Services/AuthService";
import {Button} from "@material-ui/core";

const App = () => {
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        if(IsAuthenticated()) setAuthorized(true);
        console.log(process.env.PUBLIC_URL)
    }, [])
  return (
    <>
      <div
        style={{ width: "100%", height: "100%" }}
        className="d-flex flex-column justify-content-center align-items-center container"
      >
       
          {authorized ? <LandingPage onLogout={() => setAuthorized(false)}/> : <LoginComponent onSuccessfullLogin={() => setAuthorized(true)}/>}
      </div>
    </>
  );
};

export default App;
