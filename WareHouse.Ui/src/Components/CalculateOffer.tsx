import classes from "*.module.css";
import { Button, makeStyles, Modal, Paper, TextField } from "@material-ui/core";
import React, { CSSProperties, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ApiService from "../Services/ApiService";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    // height:'25px',
    margin: "auto",
  },
  modal: {
    display: "flex",
    flexDirection: "row",
    height: "600px",
    width: "500px",
    margin: "auto",
    marginTop: "10%",
  },
  offer: {
    diplay: "none",
  },
}));

export default function CalculateOffer(props: {
  open: any;
  goods: any;
  costumers: any;
  setOpen: any;
}) {
  const [goodsName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(Number);
  const [rebate, setRebate] = useState(Number);
  const [specialDeal, setSpecialDeal] = useState(Number);
  const [seasonDeal, setSeasonDeal] = useState(Number);
  const [display, setDisplay] = useState("none");
  const [offer, setOffer] = useState({
    pricePerComand: Number,
    pricePerUnit: Number,
    rebate: Number,
    totalDiscount: Number,
  });
  const style: CSSProperties = {
    display: display,
  };
  const classes = useStyles();
  const { getOffer } = ApiService();
  async function getOffert() {
    const params = {
      goodsName,
      customerName,
      quantity,
      rebate,
      specialDeal,
      seasonDeal,
    };
    try {
      const result = await getOffer(params);
      console.log(result.status);
      setOffer(result.data);
      setDisplay("block");
    } catch (err) {
        console.log(err.message);
      alert(err.response.data);
    }
  }
  function onSave() {
    // props.open(false);
    getOffert();
  }
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.modal}>
          <div className={classes.form}>
            <div style={{ margin: "10px" }}>
              Select Product:
              <select
                name="goodsSelector"
                value={goodsName}
                onChange={(e) => setProductName(e.target.value)}
              >
                <option></option>
                {props.goods.map((t: any) => {
                  return <option value={t.name}>{t.name}</option>;
                })}
              </select>
            </div>
            <div>
              Select Customer:
              <select
                name="customersSelector"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              >
                <option></option>
                {props.costumers.map((t: any) => {
                  return <option value={t.name}>{t.name}</option>;
                })}
              </select>
            </div>

            <TextField
              required
              label="Quantity"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              value={quantity}
            />
            <TextField
              required
              label="Rebate"
              onChange={(e) => setRebate(parseInt(e.target.value))}
              value={rebate}
            />
            <TextField
              required
              label="Special Deal"
              onChange={(e) => setSpecialDeal(parseInt(e.target.value))}
              value={specialDeal}
            />
            <TextField
              required
              label="Season Deal"
              onChange={(e) => setSeasonDeal(parseInt(e.target.value))}
              value={seasonDeal}
            />
            <div style={style}>
              Price Per Comand: {offer?.pricePerComand}
              <br />
              Price Per Unit: {offer?.pricePerUnit}
              <br />
              Total Discount {offer?.totalDiscount} <br />
            </div>
            <Button
              color="primary"
              variant="contained"
              style={{ display: "flex", margin: "10px auto" }}
              onClick={() => getOffert()}
            >
              Calculate Offer
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ display: "flex", margin: "10px auto" }}
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
