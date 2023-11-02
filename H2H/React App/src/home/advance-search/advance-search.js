import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,TextField, Grid } from '@material-ui/core';
import './advance-search.css'

function AdvanceSearch(props) {

  const [state, setState]=useState({
    document_id: '',
    invoice_id: '',
    cust_number: '',
    business_year: ''
  });

  function handleInput(event){
    setState({...state,[event.target.name]: event.target.value});
  }

  function search(doc_id,invoice_id,cust_no,business_year){
    props.onSearch(doc_id,invoice_id,cust_no,business_year);
    setState({
      document_id: '',
      invoice_id: '',
      cust_number: '',
      business_year: ''
    });
  }

  return (
  <div>
  <Dialog open={props.isOpen}>
    <DialogTitle>Advance Search</DialogTitle>
    <DialogContent>
    <Grid container spacing={2} className='advance-search'>
        <Grid item xs={12} sm={6}>
        <TextField id="filled-basic" label="Document Id" name="document_id" size="small" variant="filled" placeholder='1234567890' onChange={(event)=>handleInput(event)} value={state.document_id}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField id="filled-basic" label="Invoice Id" name="invoice_id" size="small" variant="filled" placeholder='1234567890' onChange={(event)=>handleInput(event)} value={state.invoice_id}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField id="filled-basic" label="Customer Number" name="cust_number" size="small" variant="filled" placeholder='123456789' onChange={(event)=>handleInput(event)} value={state.cust_number}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField id="filled-basic" type='number' label="Business Year" name="business_year" size="small" variant="filled" placeholder='2022' onChange={(event)=>handleInput(event)} value={state.business_year}/>
        </Grid>
    </Grid>
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='advance' onClick={(event)=>{
              search(state.document_id,state.invoice_id,state.cust_number,state.business_year);
              props.onClose(event)}}>search</Button>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='advance' onClick={props.onClose}>cancel</Button>
            </Grid> 
        </Grid>
    </DialogActions>
  </Dialog>
</div>
  )
}

export default AdvanceSearch;
