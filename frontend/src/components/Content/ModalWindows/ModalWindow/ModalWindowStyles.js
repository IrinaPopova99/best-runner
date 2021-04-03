import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: '400',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: 'none',
        padding: '30px',
        outline: 'none',
    },
}));
