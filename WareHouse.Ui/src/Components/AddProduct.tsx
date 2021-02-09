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

export default function AddProduct(props: {setOpen: any, setRefresh:any}) {
  const classes = useStyles();
  const [name,setName]=useState("");
  const [price,setPrice]=useState(Number);
  const [quantity,setQuantity]=useState(Number);
  const {addProduct}=ApiService(); 
  function onSave(){
    props.setOpen(false);
    const product = {name, price, quantity};
    addProduct(product)
    props.setRefresh(name)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.form}>
        <TextField required  label="Name"  onChange={(e)=>setName(e.target.value)} value={name}/>
        <TextField required label="Price"  onChange={(e)=>setPrice(parseInt(e.target.value))} value={price}/>
        <TextField required  label="Quantity" onChange={(e)=>setQuantity(parseInt(e.target.value))} value={quantity} />
        
    </div>
    <Button color="primary" variant='contained' style={{display: 'flex', margin:'auto'}} onClick={()=>onSave()}>Save</Button>
    <Button color="primary" variant='contained' style={{display: 'flex', margin:'auto'}} onClick={()=>props.setOpen(false)}>Cancel</Button>
    </form>
    
  );
}