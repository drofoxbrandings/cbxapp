import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    loginForm: {
        padding: '1rem',
        height: '350px',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    loginContainer: {
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
        '& .MuiGrid-root':{
            padding: '1rem'
        }
    },
})); 