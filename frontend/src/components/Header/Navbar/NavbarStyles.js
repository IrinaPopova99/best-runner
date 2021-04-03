import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        marginRight: '30px',
        fontSize: '18px',
    }
});
