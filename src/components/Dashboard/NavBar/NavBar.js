import { AppBar, Container, Toolbar, Typography, Box, Tooltip, Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import logoWhite from '../../../assets/logo_white.svg'
import useStyles from './NavBarStyles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logout } from '../../../actions/Auth'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../../../actions/User';
import { toast } from 'react-toastify'

const settings = [
    {
        text: 'Account',
        icon: <AssignmentIndIcon sx={{ mr: 2, fontSize: 22, color: '#0f112e' }} />
    },
    {
        text: 'Logout',
        icon: <PowerSettingsNewIcon sx={{ mr: 2, fontSize: 22, color: '#e74c3c' }} />
    }];

const NavBar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = useSelector((state) => state.AuthReducer.user)
    const isError = useSelector((state) => state.UserReducer.isError)
    const errorMessage = useSelector((state) => state.UserReducer.errorMessage)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (i, e) => {
        e.preventDefault()
        if (i === 0) {
            dispatch(User(user.userId, navigate))
            if (isError) {
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_RIGHT, autoClose: 5000
                })
            }
        }
        if (i === 1) {
            dispatch(logout(navigate))
        }
        handleCloseUserMenu()
    }

    return (
        <AppBar position='sticky' >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        className={classes.branding}
                        noWrap
                        component="div"
                        sx={{ mr: 2, ml: 2, display: { xs: 'flex' }, px: 1, py: .35 }}>
                        <img src={logoWhite} alt="branding" />
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button onClick={handleOpenUserMenu} sx={{ mr: 2, p: 0, color: "#fff" }} >
                            <AccountCircleIcon sx={{ mr: 2 }} />
                            <Typography variant="body1">{user.username}</Typography>
                        </Button>
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, i) => (
                                <MenuItem key={i} onClick={(e) => handleMenuClick(i, e)} sx={{ minWidth: 200 }}>
                                    {setting.icon}
                                    <Typography textAlign="center">{setting.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar