import './delete.css'
import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent,Grid, DialogContentText} from '@material-ui/core';
import axios from 'axios';

function Delete(props) {

  function onDelete(){
      props.data.map(id=>{
        return (axios.post('http://localhost:8080/H2H/delete?sl_no='+id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err)))
        .finally(()=>props.search(props.searchedText))
      })
  }

  return (
    <div>
  <Dialog open={props.isOpen}>
    <DialogTitle>Delete Records ?</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are you sure you want to delete these record[s] ?
        </DialogContentText>
    </DialogContent>
    <DialogActions className='buttons'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='delete' onClick={props.onClose}>Cancel</Button>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <Button variant='outlined' fullWidth name='delete' onClick={(event)=>{
              onDelete();
              props.onClose(event)}}>Delete</Button>
            </Grid> 
        </Grid>
    </DialogActions>
  </Dialog>
</div>
  )
}

export default Delete;
