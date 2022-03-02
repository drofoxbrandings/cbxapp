import { Button } from '@mui/material'
import React, { Fragment } from 'react'

const NavButton = ({ menuIcon, menuItem }) => {
    return (
        <Fragment>
            <Button sx={{ mx: .5 }} variant="outlined" color="secondary">{menuIcon}{menuItem}</Button>
        </Fragment>
    )
}

export default NavButton