import React from 'react';
import Filter from './Actions/Filter/Filter';
import Grid from '@material-ui/core/Grid';
import WorkoutsList from './Workouts/WorkoutsList';

function Content() {
    return (
        <Grid container spacing={3} justify="space-between" alignItems="top">
                <Grid  item xs={2}>
                    <Filter />
                </Grid>
                <Grid  item xs={10}>
                    <WorkoutsList />
                </Grid>
            </Grid>
    )
}

export default Content;
