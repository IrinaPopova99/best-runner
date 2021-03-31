import './App.css';
import Header from './components/Header/Header';
import WorkoutsList from './components/Workouts/WorkoutsList';
import Grid from '@material-ui/core/Grid';
import Content from './components/Content';

function App() {
    return (
        <>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid  item xs={12}>
                    <Header />
                </Grid>
                <Grid  item xs={11}>
                    <Content />
                </Grid>
            </Grid>

        </>
    );
}

export default App;
