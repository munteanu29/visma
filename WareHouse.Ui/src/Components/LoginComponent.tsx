import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import {Login} from "../Services/AuthService";

interface LoginProps {
  onSuccessfullLogin: () => void;
}

export const LoginComponent = (props: LoginProps) => {
  let email: string;
  let password: string;

  const SubmitForm = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidated = email && re.test(String(email).toLowerCase());
    const passwordValidated = password && password.length >= 6;

    if(emailValidated && passwordValidated)
        Login(email, password).then((authorized) => authorized ? props.onSuccessfullLogin() : console.log("invalid credentials")).catch(e => console.log(e));
  };
  return (
    <div
      style={{
        width: "500px",
        minHeight: "300px",
        padding: "50px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      className="d-flex flex-column justify-content-between"
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        id="standard-basic"
        label="Email"
        placeholder="user@warehouse.com"
        onChange={(e) => (email = e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        onChange={(e) => (password = e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => SubmitForm()}>
        Login
      </Button>
    </div>
  );
};
