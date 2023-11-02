import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,Grid} from '@material-ui/core';
import BarChart from '../bar-chart/bar-chart';
import './chart-dailog.css';
import PieChart from '../pie-chart/pie-chart';


export default function ChartDialog(props) {

  const [data, setData]=useState([]);

  useEffect(()=>{
    const {due_date,to_due_date,baseline_create_date,to_baseline_create_date,clear_date,to_clear_date}=props.data
    if(due_date!=='' && baseline_create_date!=='' && clear_date!==''){
        fetch(`http://localhost:8080/H2H/display?due=${due_date}&to_due=${to_due_date}&base=${baseline_create_date}&to_base=${to_baseline_create_date}&clear=${clear_date}&to_clear=${to_clear_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(due_date!=='' && baseline_create_date!==''){
        fetch(`http://localhost:8080/H2H/display?due=${due_date}&to_due=${to_due_date}&base=${baseline_create_date}&to_base=${to_baseline_create_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(baseline_create_date!=='' && clear_date!==''){
        fetch(`http://localhost:8080/H2H/display?base=${baseline_create_date}&to_base=${to_baseline_create_date}&clear=${clear_date}&to_clear=${to_clear_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(due_date!=='' && clear_date!==''){
        fetch(`http://localhost:8080/H2H/display?due=${due_date}&to_due=${to_due_date}&clear=${clear_date}&to_clear=${to_clear_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(due_date!==''){
        fetch(`http://localhost:8080/H2H/display?due=${due_date}&to_due=${to_due_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(baseline_create_date!==''){
        fetch(`http://localhost:8080/H2H/display?base=${baseline_create_date}&to_base=${to_baseline_create_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
    else if(clear_date!==''){
        fetch(`http://localhost:8080/H2H/display?clear=${clear_date}&to_clear=${to_clear_date}`)
        .then((res)=>res.json())
        .then(res=>setData(res.data))
    }
},[props.data])

  return (
      <div>
    <Dialog open={props.isOpen} fullWidth={true} maxWidth={'md'} fullScreen scroll='paper'>
    <DialogTitle className='backg'>Analytics View</DialogTitle>
    <DialogContent className='backg'>
        <BarChart data={data}/>
        { props.data.invoice_currency!=="" && <PieChart data={data} selected={props.data.invoice_currency}/>}
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Button variant='outlined' fullWidth name='delete' onClick={props.onClose}>Close</Button>
            </Grid>
        </Grid>
    </DialogActions>
  </Dialog>
  </div>
  )
}
