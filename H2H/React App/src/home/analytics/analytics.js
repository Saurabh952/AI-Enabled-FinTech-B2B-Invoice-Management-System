import React, { useState } from 'react'
import './analytics.css'
import ChartDialog from './chart-dialog/chart-dialog';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,Grid, TextField} from '@material-ui/core';

function Analytics(props) {

    const [isOpen,setIsOpen]=useState(false);
    const [state, setState]=useState({
      due_date: '',
      to_due_date: '',
      baseline_create_date: '',
      to_baseline_create_date: '',
      clear_date: '',
      to_clear_date: '',
      invoice_currency: ''
    })

    function onClose(){
        setIsOpen(false);
    }

    function handleInput(event){
      setState({...state, [event.target.name]:event.target.value})
    }
    
    let dialog=null;

    if(isOpen){
    dialog=(<ChartDialog isOpen={isOpen} onClose={onClose} data={state}/>);
    }

  return (
    <div>
    {dialog}
    <Dialog open={props.isOpen} fullWidth maxWidth="sm">
    <DialogTitle>Analytics View</DialogTitle>
    <DialogContent>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <label className='analytics-label'>Clear Date</label>
            <Grid container spacing={1} direction='column' className='grid'>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="clear_date" label='From Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.clear_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="to_clear_date" label='To Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.to_clear_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <label className='analytics-label'>Due Date</label>
            <Grid container spacing={1} direction='column' className='grid'>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="due_date" label='From Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.due_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="to_due_date" label='To Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.to_due_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <label className='analytics-label'>Baseline Create Date</label>
            <Grid container spacing={1} direction='column' className='grid'>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="baseline_create_date" label='From Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.baseline_create_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="to_baseline_create_date" label='To Date' size="small" type='date' onChange={(event)=>handleInput(event)} value={state.to_baseline_create_date} fullWidth variant="filled" placeholder='123456789'/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <label className='analytics-label'>Invoice Currency</label>
            <Grid container spacing={1} direction='column' className='grid'>
                <Grid item xs={12}>
                    <TextField id="filled-basic" name="invoice_currency" label='Invoice Currency' size="small" type='text' onChange={(event)=>handleInput(event)} value={state.invoice_currency} fullWidth variant="filled" placeholder='USD'/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='analytics' onClick={()=>setIsOpen(true)}>Submit</Button>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='analytics' onClick={props.onClose}>Cancel</Button>
            </Grid> 
        </Grid>
    </DialogActions>
  </Dialog>
  </div>
  )
}

export default Analytics;
