import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    branding: {
        '& img': {
            width: "30%"
        },
        [theme.breakpoints.up('md')]: {
            '& img': {
                width: "40%"
            },
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            '& img': {
                width: "60%"
            },
        },
    },
    popOutWidthNav: {
        width: '300px'
    }
})); 