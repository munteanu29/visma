import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button  } from '@material-ui/core';
import ApiService from '../Services/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form:{
      display:'flex',
      flexDirection: 'column'
  }
}));

export default function AddCustomer(props: {setOpen: any, setRefresh:any}) {
  const classes = useStyles();
  const [name,setName]=useState("");
  const [rebate,setRebate]=useState(Number);
  const [sellRate,sellRateName]=useState(Number);
  const {addCustomer}=ApiService(); 
  function onSave(){
    props.setOpen(false);
    const customer = {name, rebate, sellRate};
    addCustomer(customer)
    props.setRefresh(name)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.form}>
        <TextField required  label="Name"  onChange={(e)=>setName(e.target.value)} value={name}/>
        <TextField required label="Rebate"  onChange={(e)=>setRebate(parseInt(e.target.value))} value={rebate}/>
        <TextField required  label="Sell Rate" onChange={(e)=>sellRateName(parseInt(e.target.value))} value={sellRate} />
        
    </div>
    <Button color="primary" variant='contained' style={{display: 'flex', margin:'auto'}} onClick={()=>onSave()}>Save</Button>
    <Button color="primary" variant='contained' style={{display: 'flex', margin:'auto'}} onClick={()=>props.setOpen(false)}>Cancel</Button>
    </form>
  );
}