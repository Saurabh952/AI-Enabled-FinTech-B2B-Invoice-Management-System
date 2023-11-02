import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,TextField, Grid, Snackbar} from '@material-ui/core';
import './add.css';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios';
import moment from 'moment';

function Add(props) {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertmessage] = useState('Enter all fields !!');

  const handleClose = () => {
    setSuccess(false);
    setError(false);
  };

  const [state,setState]=useState({
    business_code: '',
    cust_number: '',
    clear_date: '',
    business_year: '',
    document_id: '',
    posting_date: '',
    document_create_date: '',
    due_date: '',
    invoice_currency: '',
    document_type: '',
    posting_id: '',
    total_open_amount: '',
    baseline_create_date: '',
    customer_payment_terms: '',
    invoice_id: ''
  });

  function handleInput(event){
    setState({...state,[event.target.name]:event.target.value});
  }

  function addData(event){
    if(state.business_year>2030){
      setAlertmessage('Business year should be less than 2030');
      setError(true);
    }
    else if(state.business_code!=='' && state.cust_number!=='' && state.clear_date!=='' && state.business_year!=='' && state.document_id!=='' && state.posting_date!=='' && state.document_create_date!=='' && state.due_date!=='' && state.invoice_currency!=='' && state.document_type!=='' && state.posting_id!=='' && state.total_open_amount!=='' && state.baseline_create_date!=='' && state.customer_payment_terms!=='' && state.invoice_id!==''){
      axios.post(`http://localhost:8080/H2H/add?business_code=${state.business_code}&cust_number=${state.cust_number}&clear_date=${moment(state.clear_date).format("DD-MM-YYYY")}&buisness_year=${state.business_year}&doc_id=${state.document_id}&posting_date=${moment(state.posting_date).format("DD-MM-YYYY")}&document_create_date=${moment(state.document_create_date).format("DD-MM-YYYY")}&due_in_date=${moment(state.due_date).format("DD-MM-YYYY")}&invoice_currency=${state.invoice_currency}&document_type=${state.document_type}&posting_id=${state.posting_id}&total_open_amount=${state.total_open_amount}&baseline_create_date=${moment(state.baseline_create_date).format("DD-MM-YYYY")}&cust_payment_terms=${state.customer_payment_terms}&invoice_id=${state.invoice_id}`)
      .then(res=>{
      setSuccess(true)
      })
      .catch(err=>console.log(err));
      setState({
        business_code: '',
        cust_number: '',
        clear_date: '',
        business_year: '',
        document_id: '',
        posting_date: '',
        document_create_date: '',
        due_date: '',
        invoice_currency: '',
        document_type: '',
        posting_id: '',
        total_open_amount: '',
        baseline_create_date: '',
        customer_payment_terms: '',
        invoice_id: ''
      });
      props.onClose(event);
      }
    else{
      setAlertmessage('Enter all fields !!');
      setError(true)
    }
  }

  return (
    <div>
    <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {alertMessage}
      </Alert>
    </Snackbar>
    <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Data Added !!
      </Alert>
    </Snackbar>
  <Dialog open={props.isOpen} fullWidth maxWidth="md">
    <DialogTitle>Add</DialogTitle>
    <DialogContent>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="business_code" label='Business Code' size="small" fullWidth variant="filled" value={state.business_code} onChange={(event)=>handleInput(event)} placeholder='U001' inputProps={{maxLength: 10}}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="cust_number" label='Customer Number' type='number' size="small" fullWidth variant="filled" value={state.cust_number} onChange={(event)=>handleInput(event)} placeholder='123456789'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="clear_date" label='Clear Date' size="small" type='date' format='yyyy-mm-dd' fullWidth variant="filled" value={state.clear_date} onChange={(event)=>handleInput(event)} placeholder='123456789'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="business_year" label='Business Year' type='number' size="small" fullWidth variant="filled" value={state.business_year} onChange={(event)=>handleInput(event)} placeholder='2022'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="document_id" label='Document Id' size="small" fullWidth variant="filled" value={state.document_id} onChange={(event)=>handleInput(event)} placeholder='1234567890' inputProps={{maxLength: 10}}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="posting_date" label='Posting Date' size="small" type='date' fullWidth variant="filled" value={state.posting_date} onChange={(event)=>handleInput(event)}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="document_create_date" label='Document Create Date' size="small" type='date' fullWidth variant="filled" value={state.document_create_date} onChange={(event)=>handleInput(event)}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="due_date" label='Due Date' size="small" type='date' fullWidth variant="filled" value={state.due_date} onChange={(event)=>handleInput(event)}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="invoice_currency" label='Invoice Currency' size="small" fullWidth variant="filled" value={state.invoice_currency} onChange={(event)=>handleInput(event)} placeholder='USD' inputProps={{maxLength: 5}}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="document_type" label='Document Type' size="small" fullWidth variant="filled" value={state.document_type} onChange={(event)=>handleInput(event)} placeholder='RV' inputProps={{maxLength: 5}}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="posting_id" label='Posting Id' type='number' size="small" fullWidth variant="filled" value={state.posting_id} onChange={(event)=>handleInput(event)} placeholder='1'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="total_open_amount" label='Total Open Amount' type='number' size="small" fullWidth variant="filled" value={state.total_open_amount} onChange={(event)=>handleInput(event)} placeholder='5433.25'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="baseline_create_date" type='date' label='Baseline Create Date' fullWidth size="small" variant="filled" value={state.baseline_create_date} onChange={(event)=>handleInput(event)} placeholder='1234567890'/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="customer_payment_terms" label='Customer Payment Terms' size="small" fullWidth variant="filled" value={state.customer_payment_terms} onChange={(event)=>handleInput(event)} placeholder='ABC4' inputProps={{maxLength: 5}}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField id="filled-basic" name="invoice_id" label='Invoice Id' type='number' size="small" fullWidth variant="filled" value={state.invoice_id} onChange={(event)=>handleInput(event)} placeholder='1234567890'/>
        </Grid>
    </Grid>
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='add' onClick={(event)=>addData(event)}>Add</Button>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='add' onClick={props.onClose}>CANCEL</Button>
            </Grid> 
        </Grid>
    </DialogActions>
  </Dialog>
</div>
  )
}

export default Add;