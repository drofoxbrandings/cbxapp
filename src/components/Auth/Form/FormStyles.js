import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    errorMsg: {
        fontSize: '14px',
        color: '#f44336'
    },
    formField: {
        margin: '1rem 0',
    },
    selfEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    mup1:{
        marginTop: '1rem !important'
    },
    link:{
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        width: 'max-content'
    },
    flexend:{
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonLink:{
        padding: '1rem',
        width: '100%',
        
    }
})); 