import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
export const MainNavigation = [
    {
        navItem: 'Dashboard',
        navIcon: <DashboardIcon />,
        link: '/dashboard'
    },
    {
        navItem: 'Shipment',
        navIcon: <LocalShippingIcon />,
        link: '/shipment'
    },
    {
        navItem: 'Webmail',
        navIcon: <LocalPostOfficeIcon />,
        link: '/webmail'
    },
    {
        navItem: 'User',
        navIcon: <PersonIcon />,
        link: '/user'
    }

]