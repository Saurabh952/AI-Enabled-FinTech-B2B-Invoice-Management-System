import React, { useEffect, useState } from 'react'
import './edit.css'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,TextField, Grid } from '@material-ui/core';
import axios from 'axios';


function Edit(props) {

  const [state, setState]=useState({
    invoice_currency:'',
    cust_payment_terms:''
  })

  useEffect(()=>{
    setState({invoice_currency:props.editData.invoice,cust_payment_terms:props.editData.cust_payment_terms})
  },[props.editData.invoice,props.editData.cust_payment_terms])

  function handleInput(event){
    setState({...state,[event.target.name]:event.target.value})
  }

  function onEdit(){
    axios.post(`http://localhost:8080/H2H/edit?invoice=${state.invoice_currency}&payterms=${state.cust_payment_terms}&id=${props.data[0]}`)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    .finally(()=>props.search(props.searchedText));
    setState({
      invoice_currency: '',
      cust_payment_terms: ''
    });
  }
  
return (
  <div>
  <Dialog open={props.isOpen}>
    <DialogTitle>Edit</DialogTitle>
    <DialogContent>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
        <TextField id="filled-basic" label="Invoice Currency" name='invoice_currency' variant="filled" onChange={(event)=>handleInput(event)} value={state.invoice_currency} placeholder='USD' inputProps={{maxLength: 5}}/>
        </Grid>
        <Grid item xs={12} sm={5}>
        <TextField id="filled-basic" label="Customer Payment Terms" name='cust_payment_terms' variant="filled" onChange={(event)=>handleInput(event)} value={state.cust_payment_terms} placeholder='ABCD' inputProps={{maxLength: 5}}/>
        </Grid>
    </Grid>
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='edit' onClick={(event)=>{
              onEdit();
              props.onClose(event);
            }
            }>Edit</Button>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='edit' onClick={props.onClose}>Cancel</Button>
            </Grid> 
        </Grid>
    </DialogActions>
  </Dialog>
</div>
  )
}

export default Edit;