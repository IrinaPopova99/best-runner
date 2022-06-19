import MongoDB from './MongoDB';
import Express from './Express';

const app = new Express().app;
const db = new MongoDB();

const PORT = process.env.PORT || 5000;

db.connect()
    .then((res) => {
        app.listen(PORT, () => console.log('alive'));
    })
    .catch((err) => console.log(err));
