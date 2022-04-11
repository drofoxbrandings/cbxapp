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
    },
    btnTxt: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    menuButtonPanel: {
        background: '#e1516945',
        width: 'max-content',
        padding: '0 2rem',
        borderRadius: '100px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 0 8px 0px #a81d34',
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    menuBtn: {
        '&.active': {
            color: theme.palette.primary.main
        }
    }
}));