import { IconButton, Box } from '@mui/material'
import React, { Fragment, useState } from 'react'
import useStyles from './NavBarStyles'
import { MainNavigation } from '../../../constants/MainNavigation'
import { NavLink } from 'react-router-dom'
import { Link, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'


const NavButton = () => {
    const classes = useStyles()
    const [isActive, setIsActive] = useState()

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {MainNavigation.map((action) => (
                <SpeedDialAction
                    key={action.navItem}
                    icon={action.navIcon}
                    tooltipTitle={action.navItem}
                    component={NavLink}
                    to={action.link}
                />
            ))}
        </SpeedDial>
    )
}

export default NavButton