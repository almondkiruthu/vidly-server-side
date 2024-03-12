import express from 'express';
import genresRouter from './routes/genres';
const app = express();

app.use(express.json());

app.use('/api/genres', genresRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
