import express from 'express';
import Joi from 'joi';

const genresRouter = express.Router();

const genres = [
  { id: 1, name: 'Acton' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

genresRouter.get('/', (_req, res) => {
  res.send(genres);
});

genresRouter.get('/:id', (req, res) => {
  const genre = genres.find((genre) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

genresRouter.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

genresRouter.put('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

genresRouter.delete('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre: { id: string | number; name: string }) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

export default genresRouter;
