import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsAll } from './redux/workouts/actions';
import ChartPage from './components/Chart/ChartPage';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import './App.scss';

const App = () => {
    const dispatch = useDispatch();

    const workouts = useSelector(state => state.workoutReducer.workouts);

    useEffect(() => {
        dispatch(getWorkoutsAll());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Grid container justify="center" alignItems="center">
                <Grid container item xs={11}>
                    <Route exact path="/" render={() => <Content workouts={workouts} />} />
                    <Route exact path="/chart" render={() => <ChartPage workouts={workouts} />} />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
