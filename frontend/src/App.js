import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsAll } from './redux/workouts/actions';
import './App.css';
import ChartPage from './components/Chart/ChartPage';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

function App() {
    const dispatch = useDispatch();

    const workouts = useSelector(state => state.workoutReducer.workouts);

    const error = useSelector(state => state.workoutReducer.error);

    if (error) alert(error);

    useEffect(() => {
        console.log('get')
        dispatch(getWorkoutsAll());
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={11}>
                    <Route exact path="/" render={() => <Content workouts={workouts} />} />
                    <Route exact path="/chart" render={() => <ChartPage workouts={workouts} />} />
                </Grid>
            </Grid>

        </>
    );
}

export default App;
