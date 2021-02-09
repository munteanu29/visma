import { Button, makeStyles, Modal , Paper} from '@material-ui/core';
import React, { useState } from 'react';
import ApiService from "../Services/ApiService";
import AddCustomer from "./AddCustomer";
import { DataGrid } from '@material-ui/data-grid';


const useStyles = makeStyles((theme) => ({
 

}));
export default function CustomerFeed(props: {customers:any}) {

  const classes = useStyles();
  const {getCustomers} =ApiService();
  const [feed, setFeed] = useState([]);
  const [open, setOpen] =useState(false);
  const [refresh,setRefresh]=useState();

  React.useEffect(() => {
    getCustomersFeed();
  },[refresh] );

  const getCustomersFeed = async () =>{
      var result = await getCustomers();
      setFeed(result.data);
      props.customers(result.data);

      
  }
  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'rebate', headerName: 'Rebate', width: 130 },
    { field: 'sellRate', headerName: 'Sell Rate', width: 130 },
  ]
  return (
      <div style={{ height: '100%', width: '100%' }}>
     <p>Customers</p> 
    <div style={{ height: 300, width: '100%' }}>
     <DataGrid rows={feed} columns={columns} pageSize={5} checkboxSelection />
    </div>
    <Button onClick={()=>setOpen(true)} variant='contained' >Add Customer</Button>
    <Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
    <Paper style={{width:'300px', height:'300px', margin:'auto', marginTop: '10%'}}>
  <AddCustomer setRefresh={(e:any)=>setRefresh(e)} setOpen={(e:any)=>setOpen(e)}/>
  
  </Paper >
    </Modal>
    </div>
  );
}
