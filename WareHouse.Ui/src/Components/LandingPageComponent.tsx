import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {Logout} from "../Services/AuthService";
import { DataGrid } from '@material-ui/data-grid';
import GoodsFeed from './GoodsComponent';
import CustomerFeed from './CustomersComponent';
import CalculateOffer from './CalculateOffer';
import classes from '*.module.css';

type LandingPageProps = {
    onLogout: () => void;
}
const useStyles = makeStyles((theme) => ({
    tables:{
        display:'flex',
    }

}));
export default function LandingPage(props: LandingPageProps) {
    const classes=useStyles();
    const [open, setOpen]=useState(false)
    const[goods,setGoods]=useState([{name:"ceva"}]);
    const[costumers,setCostumers]=useState([]);
    function handleLogout() {
        Logout();
        props.onLogout();
    }
    useEffect(() => {
       console.log(goods)
      
    }, [goods])
   
        return (<div className="container d-flex flex-column">
        <div className="d-flex justify-content-end my-5">
        <Button  style={{marginRight:'auto'}}onClick={() =>setOpen(true)}>Calculate Offer</Button>
        <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
       
        <div className={classes.tables}>
        <CalculateOffer open={open} goods={goods} costumers={costumers} setOpen={setOpen}/>
        <GoodsFeed goods={(e:any)=>setGoods(e)}/>
        <CustomerFeed customers={(e:any)=> setCostumers(e)}/>
        </div>
       
    </div>
        )
}