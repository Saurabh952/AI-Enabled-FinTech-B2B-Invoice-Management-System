import React from 'react'
import './header.css'
import abcLogo from './abc.png'
import {Grid} from '@material-ui/core'
import highradiusLogo from './highradius.png'

function Header() {
  return (
    <div className='header'>
      <Grid container alignItems='center'>
        <Grid item xs={12} md={2}>
          <Grid container direction='column'>
            <Grid item xs={12}>
            <img src={abcLogo} className='abc' alt='...'></img>
            </Grid> 
            <Grid item xs={12}>
            <p className='invoice-list'>Invoice List</p>
            </Grid> 
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} className='childHeader'>
          <img src={highradiusLogo} className='highradiusLogo' alt='...'></img>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header;