import { Button, makeStyles, Modal, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import ApiService from "../Services/ApiService";
import { DataGrid } from '@material-ui/data-grid';
import AddProduct from "./AddProduct";


const useStyles = makeStyles((theme) => ({
 

}));
export default function GoodsFeed(props: {goods:any}) {

  const classes = useStyles();
  const {getGoods} =ApiService();
  const [open, setOpen] =useState(false);
  const [feed, setFeed] = useState([]);
  const [refresh,setRefresh]=useState();

  React.useEffect(() => {
    getCustomersFeed();
  },[refresh] );

  const getCustomersFeed = async () =>{
      var result = await getGoods();
      setFeed(result.data);
      props.goods(result.data);
      
  }
  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Rebate', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
  ]
  return (
      <div style={{ height: '100%', width: '100%' }}>
     <p>Products</p> 
    <div style={{ height: 300, width: '100%' }}>
     <DataGrid rows={feed} columns={columns} pageSize={5} checkboxSelection />
    </div>
    <Button onClick={()=>setOpen(true)} variant='contained' >Add Product</Button>
    <Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
    <Paper style={{width:'300px', height:'300px', margin:'auto', marginTop: '10%'}}>
  <AddProduct setRefresh={(e:any)=>setRefresh(e)} setOpen={(e:any)=>setOpen(e)}/>
  
  </Paper >
    </Modal>
    </div>
  );
}
