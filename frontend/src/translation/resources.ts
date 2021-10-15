import commonRU from './ru/common.json';
import workoutRU from './ru/workout.json';
import sidebarRU from './ru/sidebar.json';
import chartRU from './ru/chart.json';

export const resources = {
  ru: {
    common: commonRU,
    workout: workoutRU,
    sidebar: sidebarRU,
    chart: chartRU,
  },
};

export const languages = Object.keys(resources);
