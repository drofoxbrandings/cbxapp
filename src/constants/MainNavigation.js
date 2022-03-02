import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PersonIcon from '@mui/icons-material/Person';
export const MainNavigation = [
    {
        navItem: 'Shipment',
        navIcon: <LocalShippingIcon sx={{mr: 1}}/>
    },
    {
        navItem: 'Webmail',
        navIcon: <LocalPostOfficeIcon sx={{mr: 1}}/>
    },
    {
        navItem: 'User',
        navIcon: <PersonIcon sx={{mr: 1}}/>
    }

]