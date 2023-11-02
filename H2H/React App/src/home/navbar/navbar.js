import React, { useState } from 'react'
import './navbar.css'
import {Grid, Button, ButtonGroup} from '@material-ui/core'
import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem,List,TextField } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { Link } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh'
import Edit from '../edit/edit';
import Delete from '../delete/delete';
import Add from '../add/add';
import axios from 'axios';
import AdvanceSearch from '../advance-search/advance-search';
import Analytics from '../analytics/analytics';

function Navbar(props) {

  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
  const [isAdd, setIsAdd]=useState(false);
  const [isAdvance, setIsAdvance]=useState(false);
  const [isAnalytics, setIsAnalytics]=useState(false);
  const [searchText,setSearchText]=useState("");
  const [isOpen, setIsOpen]=useState(false);

  function Close(event){
    if(event.currentTarget.name==='edit'){
      setIsEdit(false);
    }
    else if(event.currentTarget.name==='delete'){
      setIsDelete(false);
    }
    else if(event.currentTarget.name==='add'){
      setIsAdd(false);
    }
    else if(event.currentTarget.name==='advance'){
      setIsAdvance(false);
    }
    else if(event.currentTarget.name==='analytics'){
      setIsAnalytics(false);
    }
  }

  function handleInput(event){
    setSearchText(event.target.value);
    props.search(event.target.value);
  }

  function onAdvanceSearch(doc_id,invoice_id,cust_no,business_year){
    props.advanceSearch(doc_id,invoice_id,cust_no,business_year);
  }

  function UpdateAgingBucket(value,doc_id){
    axios.post(`http://localhost:8080/H2H/edit?value=${value}&doc_id=${doc_id}`)
    .then(()=>props.refresh())
  }

  function predict(){
    axios.post('http://127.0.0.1:5000/',{...props.predictData[0],'converted_usd': props.predictData[0].invoice_currency==='USD'?props.predictData[0].total_open_amount:props.predictData[0].total_open_amount*0.7})
    .then(res=>{UpdateAgingBucket(res.data[0].aging_bucket,res.data[0].doc_id)})
  }

  return (
    <div>
      <Edit isOpen={isEdit} onClose={Close} data={props.data} search={props.search} searchedText={searchText} editData={props.editData}/>
      <Delete isOpen={isDelete} onClose={Close} data={props.data} search={props.search} searchedText={searchText}/>
      <Add isOpen={isAdd} onClose={Close}/>
      <AdvanceSearch isOpen={isAdvance} onClose={Close} onSearch={onAdvanceSearch}/>
      <Analytics isOpen={isAnalytics} onClose={Close} />
    <div className='navbar'>
      <Hidden smDown>
      <Grid container alignItems='center'>
        <Grid item xs={5}>
          <ButtonGroup variant="outlined" size="medium" aria-label="outlined button group" fullWidth={true}>
          <Button onClick={predict}>PREDICT</Button>
          <Button onClick={()=>setIsAnalytics(true)}>ANALYTICS VIEW</Button>
          <Button onClick={()=>setIsAdvance(true)}>ADVANCED SEARCH</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={2} className='search-div'>
        <IconButton aria-label="refresh" className='refresh-button' onClick={props.refresh}>
          <RefreshIcon />
          </IconButton>
        <TextField id="filled-basic" label="Search Customer Id" size="small" variant="filled" onChange={(event)=>handleInput(event)} value={searchText} placeholder='123456789'/>
        </Grid>
        <Grid item xs={5}>
          <ButtonGroup variant="outlined" size="medium" aria-label="outlined button group" fullWidth={true}>
            <Button onClick={()=>setIsAdd(true)}>ADD</Button>
            <Button onClick={()=>setIsEdit(true)} disabled={props.disabledEdit}>EDIT</Button>
            <Button onClick={()=>setIsDelete(true)} disabled={props.disabledDelete}>DELETE</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      </Hidden>
      <Hidden mdUp>
        <IconButton onClick={()=>setIsOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    </div>
    <Drawer open={isOpen} onClose={()=>setIsOpen(false)}>
      <List>
          <ListItem>
          <input type='text' className='navSearch' onChange={(event)=>handleInput(event)} onKeyPress={(event)=>{if(event.key==='Enter'){props.search(searchText)}}} value={searchText} placeholder='Search Customer Id'/>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' onClick={()=>setIsAdd(true)}>
            Add
            </Link>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' className={`disabled-${props.disabledEdit}`} onClick={()=>setIsEdit(true)}>
            Edit
            </Link>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' className={`disabled-${props.disabledDelete}`} onClick={()=>setIsDelete(true)}>
            Delete
            </Link>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' onClick={()=>setIsAdvance(true)}>
            Advance Search
            </Link>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' onClick={()=>setIsAnalytics(true)}>
            Analytics View
            </Link>
          </ListItem>
          <ListItem>
            <Link variant='button' underline='none' onClick={predict}>
            Predict
            </Link>
          </ListItem>
      </List>
    </Drawer>
    </div>
  )
}

export default Navbar;
