import { IconButton, Box } from '@mui/material'
import React, { Fragment, useState } from 'react'
import useStyles from './NavBarStyles'
import { MainNavigation } from '../../../constants/MainNavigation'
import { NavLink } from 'react-router-dom'
import { Link } from '@mui/material'


const NavButton = () => {
    const classes = useStyles()
    const [isActive, setIsActive] = useState()

    return (
        <Fragment>
            <Box className={classes.menuButtonPanel} sx={{zIndex: '99'}}>
                {MainNavigation.map((item, i) => (
                    <IconButton
                        key={i}
                        component={NavLink}
                        to={item.link}
                        id={i} sx={{ mx: .5, my: .5 }} variant="outlined" color="secondary"
                        className={classes.menuBtn}
                    >
                        {item.navIcon}
                    </IconButton >
                ))}
            </Box>
        </Fragment>
    )
}

export default NavButton