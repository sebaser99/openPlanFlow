import React, { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context';

export const NavBar = () => {
  const {openSideMenu} = useContext(UIContext)
  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                onClick={openSideMenu}
            >
                <MenuOutlinedIcon/>
            </IconButton>
            <Typography variant='h6'>OpenPlanFlow</Typography>
        </Toolbar>

    </AppBar>
  )
}
