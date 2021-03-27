import express from 'express';
import bodyParser from 'body-parser';
import workoutsRouters from './routes/workout.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/workout', workoutsRouters);

app.get('/', (req, res) => res.send('hello homepage'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));