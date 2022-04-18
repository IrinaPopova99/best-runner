import MongoDB from './MongoDB';
import Express from './Express';

const app = new Express().app;
const db = new MongoDB();

const PORT = process.env.PORT || 5000;

console.log(process.env)

db.connect()
    .then((res) => {
        app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
    })
    .catch((err) => console.log(err));
