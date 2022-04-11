import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    profileCard: {
        // minHeight: '450px',
        background: '#0f112e !important',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    avatar: {
        margin: '2rem',
        width: '5rem !important',
        height: '5rem !important'
    },
    badge: {
        border: '2px solid #a81d34',
        padding: '0.25rem 0.5rem',
        borderRadius: '100px',
        color: '#fff',
        minWidth: '3rem',
        textAlign: 'center',
        textTransform: 'uppercase',
        margin: '0 1rem !important',
        fontSize: '.75rem !important'
    },
    badgeContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 0',
    },
    actionPanel:{
        width: '100%',
        justifyContent: 'space-around',
        boxShadow: 'inset 0 0 4px 0 #000',
        padding: '1rem 0 !important',
        flexDirection: 'column',
        paddingBottom: '1.5rem !important',
        background: '#0b0d22'
    }
})); 